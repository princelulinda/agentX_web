import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://agentx.pythonanywhere.com/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token !== null && token != 'undefined') {
      // console.log(token =="undefined");
      
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// // Response interceptor
// axiosInstance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     // Handle 401 errors (unauthorized)
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       // Clear token and redirect to login
//       localStorage.removeItem('token');
//       window.location.href = '/login';
//       return Promise.reject(error);
//     }

//     // Handle other errors
//     const errorMessage = error.response?.data?.message || error.message || 'Une erreur est survenue';
//     error.message = errorMessage;
//     return Promise.reject(error);
//   }
// );

export default axiosInstance;
