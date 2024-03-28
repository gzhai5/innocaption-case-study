import axios from "axios";

const baseURL = `https://dummyjson.com`;

export const instance = axios.create({
  baseURL: baseURL
});