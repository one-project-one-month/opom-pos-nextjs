import axios from "axios";

const Axios = axios.create({
  baseURL: "https://79403962ac78.ngrok-free.app/api/v1",
});

Axios.defaults.baseURL = "";

Axios.interceptors.request.use(
  async (config) => {
    const token = '269|EcLaibOYGIhGKhtwN5xvanzkFLQ9dMV4tMNIj7r970b93540';

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    config.headers.set('ngrok-skip-browser-warning', '69420');
    return config;
  },
  (error) => Promise.reject(error)
);

Axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response.status === 401) {
      //refresh token api call
      // ....
      const access_token = "";
      Axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
      return Axios(error.config);
    }
    return Promise.reject(error);
  }
);

export default Axios;
