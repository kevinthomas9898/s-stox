import axios, { type InternalAxiosRequestConfig } from 'axios';
import { store } from '@/store';
import { logout } from '@/store/slices/authSlice';
import { getJwtToken, getAuthCookies, setAuthCookies, clearAuthCookies } from '@/lib/utils/cookies';
import { createToastInterceptor } from '@/lib/utils/toastInterceptor';

// const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://8.211.43.168/api';
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.smartstoxglobal.com/api';

// ── Axios Instance ──
const api = axios.create({
  baseURL: API_BASE_URL,
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

// Create toast interceptor
const toastInterceptor = createToastInterceptor({
  showSuccessToast: false, // Default to false, can be enabled per request
  showErrorToast: true,
});

api.interceptors.response.use(
  (response) => {
    // Apply toast interceptor for successful responses
    const config = response.config?.toastConfig || {};
    if (config.showSuccessToast) {
      toastInterceptor.onFulfilled(response);
    }
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 with token refresh (skip toast for refresh flow)
    if (error.response?.status === 401 && !originalRequest._retry) {
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
          `${API_BASE_URL}/auth/refreshToken`,
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
    }

    // Apply toast interceptor for errors (except 401 refresh flow)
    const config = error.config?.toastConfig || {};
    if (config.showErrorToast !== false) {
      toastInterceptor.onRejected(error);
    }

    return Promise.reject(error);
  },
);

export default api;
