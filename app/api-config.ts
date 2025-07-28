import axios from 'axios';

const Axios = axios.create();

Axios.defaults.baseURL = 'https://9005578b891e.ngrok-free.app/api/v1';

Axios.interceptors.request.use(
  async (config) => {
    const token = '311|xr52tKYN4dg7oxmKtdcJmbdL4zu9GHZy7b6ySbZhf6f0b52c';

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    config.headers.set("ngrok-skip-browser-warning", "69420");
    return config
},
    error => Promise.reject(error)
)

Axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    // Check if error.response exists before accessing its properties
    if (error.response && error.response.status === 401) {
      // For now, just reject the error instead of trying to refresh with empty token
      // TODO: Implement proper token refresh logic here
      console.error('Authentication failed. Please login again.');
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

export default Axios;
