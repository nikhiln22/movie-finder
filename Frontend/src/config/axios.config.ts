import axios from "axios";
import { envConfig } from "./env.config";

export const axiosInstance = axios.create({
  baseURL: envConfig.apiUrl,
});
