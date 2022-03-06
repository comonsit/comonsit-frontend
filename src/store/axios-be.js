import axios from 'axios';

export const baseURL = `${process.env.REACT_APP_BASE_URL}`

export const instance = axios.create({
  baseURL: baseURL
})

export default instance
