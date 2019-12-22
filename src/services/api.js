import axios from 'axios';

const api = axios.create({
  baseURL: 'https://nathan-gobarber.herokuapp.com/',
});

export default api;
