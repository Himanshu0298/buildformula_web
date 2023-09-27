import axios from 'axios';
import { store } from 'redux/store';
import { BASE_API_URL } from 'utils/constant';

export const instance = axios.create({ baseURL: BASE_API_URL });

export const config = ({ multipart = true } = {}) => {
  const {token} = store.getState().sales
  console.log("🚀 ~ file: init.ts:9 ~ config ~ token:", token)
  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Bearer ${token}`,
  };

  if (multipart) {
    headers['Content-Type'] = 'multipart/form-data';
  }

  return { headers };
};

// Add a response interceptor
instance.interceptors.response.use(
  response => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  async error => {
    const { message } = error?.response?.data || {};

    if (message?.includes('Unauthenticated')) {
      const originalRequest = error.config;
      console.log(originalRequest)

      try {
        const retryOriginalRequest = new Promise(resolve => {
          console.log('error', resolve);
        });

        return retryOriginalRequest;
      } catch (err) {
        return null;
      }
    }

    return Promise.reject(error);
  },
);
