import { ToastConfig } from '@/lib/utils/toastInterceptor';

declare module 'axios' {
  export interface InternalAxiosRequestConfig {
    toastConfig?: ToastConfig;
  }

  export interface AxiosRequestConfig {
    toastConfig?: ToastConfig;
  }
}
