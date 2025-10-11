import { createContext, useState } from "react";
import axios from "axios";

axios.defaults.withCredentials = true;

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState("");

  const login = async (email, password) => {
    try {
      console.log(email, password, "here is email");
      const res = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });
      setAccessToken(res.data.accessToken);
      return res.data; // Return the response data
    } catch (error) {
      console.error("Login error:", error);
      throw error; // Re-throw the error so LoginPage can handle it
    }
  };

  const refreshAccessToken = async () => {
    try {
      const res = await axios.post("http://localhost:5000/refresh");
      setAccessToken(res.data.accessToken);
      return res.data;
    } catch (error) {
      console.error("Refresh token error:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ accessToken, login, refreshAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
};
