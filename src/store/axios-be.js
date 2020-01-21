import axios from 'axios';

export const baseURL = 'http://localhost:8000/api'

export const instance = axios.create({
  baseURL: baseURL
})

export default instance
