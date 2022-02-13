import axios from "axios";

const commonHeaders = {
  "Content-Type": "application/json",
};

export const httpService = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 1000,
  headers: {
    ...commonHeaders,
  },
});
