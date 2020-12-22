import axios from "axios";
import { AuthorizationService } from "../auth/authorization-service";

const server = "http://localhost:8000";
// const server =process.env.REACT_APP_BACK_URL

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
