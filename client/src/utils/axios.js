import axios from 'axios';

// Create an instance of axios
const instance = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true
});

export const setToken = (token) => {
  if (token) {
    instance.defaults.headers.common['x-auth-token'] = token;
    sessionStorage.setItem('_t', token);
  } else {
    delete instance.defaults.headers.common['x-auth-token'];
    sessionStorage.removeItem('_t');
  }
};

export default instance;
