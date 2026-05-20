import { toast } from 'sonner';

export interface ToastConfig {
  successMessage?: string;
  errorMessage?: string;
  showSuccessToast?: boolean;
  showErrorToast?: boolean;
  customMessages?: Record<number, string>;
}

export const defaultToastMessages: Record<number, string> = {
  200: 'Success',
  201: 'Created successfully',
  204: 'Deleted successfully',
  400: 'Bad request. Please check your input.',
  401: 'Unauthorized. Please login again.',
  403: 'Forbidden. You do not have permission.',
  404: 'Resource not found.',
  409: 'Conflict. The resource already exists.',
  422: 'Validation error. Please check your input.',
  429: 'Too many requests. Please try again later.',
  500: 'Server error. Please try again later.',
  503: 'Service unavailable. Please try again later.',
};

export const getToastMessage = (
  status: number,
  response?: any,
  customMessages?: Record<number, string>
): string => {
  // Check for custom message first
  if (customMessages?.[status]) {
    return customMessages[status];
  }

  // Try to extract message from response (prioritize response message over defaults)
  if (response?.data?.message) {
    return response.data.message;
  }

  if (response?.data?.Message) {
    return response.data.Message;
  }

  if (response?.message) {
    return response.message;
  }

  if (response?.data?.error) {
    return response.data.error;
  }

  if (response?.data?.Error) {
    return response.data.Error;
  }

  // Check for default message
  if (defaultToastMessages[status]) {
    return defaultToastMessages[status];
  }

  // Fallback based on status range
  if (status >= 200 && status < 300) {
    return 'Success';
  } else if (status >= 400 && status < 500) {
    return 'Client error';
  } else if (status >= 500) {
    return 'Server error';
  }

  return 'Request completed';
};

export const showToastForResponse = (
  status: number,
  response?: any,
  config?: ToastConfig
) => {
  const {
    successMessage,
    errorMessage,
    showSuccessToast = true,
    showErrorToast = true,
    customMessages,
  } = config || {};

  const isSuccess = status >= 200 && status < 300;

  if (isSuccess && showSuccessToast) {
    const message = successMessage || getToastMessage(status, response, customMessages);
    toast.success(message);
  } else if (!isSuccess && showErrorToast) {
    const message = errorMessage || getToastMessage(status, response, customMessages);
    toast.error(message);
  }
};

export const createToastInterceptor = (defaultConfig?: ToastConfig) => {
  return {
    onFulfilled: (response: any) => {
      const config = { ...defaultConfig, ...(response.config?.toastConfig || {}) };
      showToastForResponse(response.status, response, config);
      return response;
    },
    onRejected: (error: any) => {
      const status = error.response?.status;
      const config = { ...defaultConfig, ...(error.config?.toastConfig || {}) };
      
      if (status) {
        showToastForResponse(status, error.response, config);
      } else {
        // Network error or no response
        const message = error.message || 'Network error. Please check your connection.';
        toast.error(message);
      }
      
      return Promise.reject(error);
    },
  };
};
