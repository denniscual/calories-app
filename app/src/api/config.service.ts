import axios from "axios";

export const httpService = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

httpService.interceptors.request.use(function (config) {
  const { headers, url } = config;

  if (url?.includes("/signin")) {
    return config;
  }

  const error = new Error("You are not authorized to send this request.");
  const loggedUser = localStorage.getItem("user");
  if (!loggedUser) {
    throw error;
  }
  const parsedLoggedUser = JSON.parse(loggedUser);
  if (!Boolean(parsedLoggedUser.accessToken)) {
    throw error;
  }

  return {
    ...config,
    headers: {
      ...headers,
      Authorization: `Bearer ${parsedLoggedUser.accessToken}`,
    },
  };
});
