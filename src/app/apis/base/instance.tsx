import axios from "axios";
import swal from 'sweetalert';

const baseURL = `https://dummyjson.com`;

export const instance = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.response.use((response) => response, (error) => {
  swal({
    title: '',
    text: error.response?.data.data,
    icon: 'error'
  });
  throw error.response?.data.data;
});