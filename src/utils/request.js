import axios from "axios";

const instance = axios.create({
  timeout: 20000,
  headers: {
    "Content-type": "application/json",
  },
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (!error.response) {
      return Promise.reject(error);
    }
  }
);

const setHeaderToken = (isNeedToken) => {
  const accessToken = isNeedToken ? getToken() : null;
  instance.defaults.headers.comon.Authorization = accessToken;
};
