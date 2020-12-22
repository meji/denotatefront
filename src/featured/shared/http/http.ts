import axios from "axios";
import { AuthorizationService } from "../auth/authorization-service";

const server = process.env.API_URI;

const authorizationService = new AuthorizationService();
const token = authorizationService.getToken();

export const http = axios.create({
  baseURL: server,
  headers: {
    Authorization: "Bearer " + token
  }
});

export const httpForm = axios.create({
  baseURL: server,
  headers: {
    Authorization: "Bearer " + token,
    "Content-Type": "multipart/form-data"
  }
});
