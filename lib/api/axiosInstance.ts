import axios, { type InternalAxiosRequestConfig } from 'axios';
import { store } from '@/store';
import { setCredentials, logout } from '@/store/slices/authSlice';

// ── Axios Instance ──
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Send cookies (refresh token) with every request
});

// ── Request Interceptor ──
// Attach access token from Redux store to every outgoing request
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const { jwtToken } = store.getState().auth;
    if (jwtToken && config.headers) {
      config.headers.Authorization = `Bearer ${jwtToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// ── Response Interceptor (401 Handling + Refresh Queue) ──
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

    // Only handle 401 errors and avoid infinite loops
    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    // If a refresh is already in progress, queue this request
    if (isRefreshing) {
      return new Promise<string>((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      }).then((token) => {
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${token}`;
        }
        return api(originalRequest);
      });
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      const { refreshToken } = store.getState().auth;
      // Call the refresh endpoint — send refreshToken in body
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/refreshToken`,
        { refreshToken },
        { withCredentials: true },
      );

      const newToken: string = data.data.jwtToken || data.data.JwtToken;
      const newRefreshToken: string = data.data.refreshToken || data.data.RefreshToken;

      // Update Redux store with the new tokens
      store.dispatch(setCredentials({ jwtToken: newToken, refreshToken: newRefreshToken }));

      // Process all queued requests with the new token
      processQueue(null, newToken);

      // Retry the original request
      if (originalRequest.headers) {
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
      }
      return api(originalRequest);
    } catch (refreshError) {
      // Refresh failed — logout and reject all queued requests
      processQueue(refreshError, null);
      store.dispatch(logout());
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  },
);

export default api;
