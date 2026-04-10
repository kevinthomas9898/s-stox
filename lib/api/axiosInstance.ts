import axios, { type InternalAxiosRequestConfig } from 'axios';
import { store } from '@/store';
import { logout } from '@/store/slices/authSlice';
import { getJwtToken, getAuthCookies, setAuthCookies, clearAuthCookies } from '@/lib/utils/cookies';

// ── Axios Instance ──
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ── Request Interceptor ──
// Add JWT token from cookie to Authorization header
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getJwtToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// ── Response Interceptor (401 Handling + Token Refresh) ──
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}> = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else if (token) {
      resolve(token);
    }
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    if (isRefreshing) {
      return new Promise<string>((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      }).then((token) => {
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return api(originalRequest);
      });
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      const { refreshToken } = getAuthCookies();
      
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/refreshToken`,
        { refreshToken },
        { headers: { 'Content-Type': 'application/json' } },
      );

      const responseData = data.data || data;
      const newJwt = responseData.jwtToken || responseData.JwtToken;
      const newRefresh = responseData.refreshToken || responseData.RefreshToken;

      // Update cookies with new tokens
      if (newJwt && newRefresh) {
        setAuthCookies(newJwt, newRefresh);
      }

      processQueue(null, newJwt);
      
      if (originalRequest.headers) {
        originalRequest.headers.Authorization = `Bearer ${newJwt}`;
      }
      return api(originalRequest);
    } catch (refreshError) {
      processQueue(refreshError, null);
      clearAuthCookies();
      store.dispatch(logout());
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  },
);

export default api;
