import axios from "axios";

const apiURLs = {
  development: "http://localhost:8080",
  production: "LINK DO DEPLOY DO SERVIDOR",
};

const api = axios.create({ baseURL: apiURLs[process.env.NODE_ENV] });

api.interceptors.request.use((config) => {
  const loggedInUserJson = localStorage.getItem("loggedInUser");

  const parseLoggedInUser = JSON.parse(loggedInUserJson || '""');

  if (parseLoggedInUser.token) {
    config.headers = { Authorization: `Bearer ${parseLoggedInUser.token}` };
  }

  return config;
});

export default api;
