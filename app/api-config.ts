import axios from 'axios';

const Axios = axios.create({
  // baseURL: 'https://backoffice.opompos.site/api/v1/',
  baseURL: 'https://ed38c55d1fdd.ngrok-free.app/api/v1/',
  // baseURL: 'https://opom-pos-laravel.up.railway.app/api/v1/',
  withCredentials: true,
})

Axios.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem('access_token');

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
      const access_token = localStorage.getItem('access_token');
      Axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
      return Axios(error.config);
    }
    return Promise.reject(error);
  }
);

export default Axios;
