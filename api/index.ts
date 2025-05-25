// API BaseUrl set -
import axios from "axios";
import { getToken } from "./storage";

const mainAPI = axios.create({
  baseURL: "https://react-bank-project.eapi.joincoded.com/",
});

//authorization

mainAPI.interceptors.request.use(async (payload) => {
  const token = await getToken();
  if (token) {
    payload.headers.Authorization = `Bearer ${token}`;
  }

  return payload;
});
export default mainAPI;
