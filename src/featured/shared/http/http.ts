import axios from 'axios';
import { AuthorizationService } from '../auth/authorization-service';

const authorizationService = new AuthorizationService();
const token = authorizationService.getToken();

export const http = axios.create({
  baseURL: process.env.REACT_APP_BACK_URL,
  headers: {
    Authorization: 'Bearer ' + token,
  },
});

export const httpForm = axios.create({
  baseURL: process.env.REACT_APP_BACK_URL,
  headers: {
    Authorization: 'Bearer ' + token,
    'Content-Type': 'multipart/form-data',
  },
});
