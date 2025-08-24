import axios from 'axios';
import NProgress from 'nprogress';

export const axiosHTTP = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production' ? '/' : '/',
});

NProgress.configure({ showSpinner: false });

let activeRequests = 0;

axiosHTTP.interceptors.request.use(
  config => {
    if (activeRequests === 0) {
      NProgress.start();
    }
    activeRequests++;
    return config;
  },
  error => {
    activeRequests--;
    if (activeRequests === 0) {
      NProgress.done();
    }
    return Promise.reject(error);
  }
);

axiosHTTP.interceptors.response.use(
  response => {
    activeRequests--;
    if (activeRequests === 0) {
      NProgress.done();
    }
    return response;
  },
  error => {
    activeRequests--;
    if (activeRequests === 0) {
      NProgress.done();
    }
    return Promise.reject(error);
  }
);
