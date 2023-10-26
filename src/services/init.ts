import axios from 'axios';
import { BASE_API_URL } from 'utils/constant';

export const instance = axios.create({ baseURL: BASE_API_URL });

export const config = ({ multipart = true } = {}) => {
  // const searchParams = new URLSearchParams(document.location.search);
  // const token = searchParams.get('token');
  const token ='eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvdnNod2FuZHJ4LmluXC91c2VybG9naW4iLCJpYXQiOjE2OTc3ODE0MTAsImV4cCI6MTY5Nzk1NDIxMCwibmJmIjoxNjk3NzgxNDEwLCJqdGkiOiJtVEtRVTVkeFJraU5nWUlEIiwic3ViIjo0NSwicHJ2IjoiODdlMGFmMWVmOWZkMTU4MTJmZGVjOTcxNTNhMTRlMGIwNDc1NDZhYSJ9.GjCElT7mq2IP1si-hwKRCcxAmsihV3mdi-f4f3L5y8Y'

  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Bearer ${token}`,
    'Access-Control-Allow-Origin': true,
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
