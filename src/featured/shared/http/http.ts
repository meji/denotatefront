import axios from 'axios';
import {AuthorizationService} from '../auth/authorization-service';
import {env} from '../../../utils/env';

require("dotenv").config();

const server = env.API_URL;

const authorizationService = new AuthorizationService();
const token = authorizationService.getToken();

export const http = axios.create({
  baseURL: server,
  headers: {
    Authorization: "Bearer " + token
  }
});
