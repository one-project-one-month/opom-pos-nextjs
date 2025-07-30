import axios from 'axios';

const Axios = axios.create({
  // TODO: Change Actual Server URL
  baseURL: '',
});

Axios.defaults.baseURL = '';

Axios.interceptors.request.use(
  async (config) => {
    const token = '347|2icm0Q9saGFYZWSSQ0vnl9Yg17r16CS0jBVcQEpS09172a1d';

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
      const access_token =
        '347|2icm0Q9saGFYZWSSQ0vnl9Yg17r16CS0jBVcQEpS09172a1d';
      Axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
      return Axios(error.config);
    }
    return Promise.reject(error);
  }
);

export default Axios;
