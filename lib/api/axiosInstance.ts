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
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const { jwtToken } = store.getState().auth;
    if (jwtToken) {
      config.headers.Authorization = `Bearer ${jwtToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// ── Response Interceptor (401 Handling + Refresh Queue) ──
let isRefreshing = false;
let failedQueue: Array<{
  resolve: () => void;
  reject: (error: unknown) => void;
}> = [];

const processQueue = (error: unknown) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve();
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
      return new Promise<void>((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      }).then(() => {
        return api(originalRequest);
      });
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      const { refreshToken } = store.getState().auth;
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/refreshToken`,
        { refreshToken: refreshToken }, // Pass token in body to avoid 415 error
        { 
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true 
        },
      );

      const responseData = data.data || data;
      const newJwt = responseData.jwtToken || responseData.JwtToken;
      const newRefresh = responseData.refreshToken || responseData.RefreshToken;

      store.dispatch(setCredentials({ 
        user: store.getState().auth.user,
        jwtToken: newJwt, 
        refreshToken: newRefresh 
      }));

      processQueue(null);
      return api(originalRequest);
    } catch (refreshError) {
      processQueue(refreshError);
      store.dispatch(logout());
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  },
);

export default api;
