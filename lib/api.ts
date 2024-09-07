import axios from "axios";
import { parseCookies } from "nookies";

const authCookies = parseCookies(null);
const token = authCookies["crivo@authToken"];

export const api = axios.create({
  baseURL: "http://localhost:3333", // Replace with your actual base URL
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
