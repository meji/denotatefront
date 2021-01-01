import axios from "axios";
import { AuthorizationService } from "../auth/authorization-service";

require("dotenv").config();

const server = process.env.API_URI;

const authorizationService = new AuthorizationService();
const token = authorizationService.getToken();

export const http = axios.create({
  baseURL: server,
  headers: {
    Authorization: "Bearer " + token
  }
});
