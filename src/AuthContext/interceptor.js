import axios from "axios";
import { AuthContext } from "./AuthContext.jsx";
import { useEffect, useContext } from "react";

export default function useAxios() {
  const { accessToken, refreshAccessToken } = useContext(AuthContext);
  const instance = axios.create({ baseURL: "http://localhost:5000" });

  useEffect(() => {
    instance.interceptors.request.use((config) => {
      if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
      return config;
    });

    instance.interceptors.response.use(
      (res) => res,
      async (err) => {
        if (err.response.status === 403) {
          await refreshAccessToken();
        }
        return Promise.reject(err);
      }
    );
  }, [accessToken]);

  return instance;
}
