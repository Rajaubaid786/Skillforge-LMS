import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// MAGIC FIX: Ye code har request ke sath tumhara Token automatically attach karega
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;