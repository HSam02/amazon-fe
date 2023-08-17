import localStorageKeys from "../utils/types/localStorageKeys";
import axios from "axios";

const appAxios = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 20000,
});

appAxios.interceptors.request.use((config) => {
  config.headers.Authorization =
    window.localStorage.getItem(localStorageKeys.TOKEN_KEY) || "";
  return config;
});

export default appAxios;
