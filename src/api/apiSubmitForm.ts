import axios from 'axios';

export const instanceSubmitFormAPI = axios.create({
  baseURL: 'https://formsubmit.co/ajax/',
});
