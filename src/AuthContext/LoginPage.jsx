import React, { useContext, useState } from "react";
import { AuthContext } from "./AuthContext.jsx";
import { useNavigate } from "react-router";

const LoginPage = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await login(email, password);
      navigate("/protected"); // Redirect to protected data after successful login
    } catch (error) {
      console.error("Login failed:", error);
      // Handle login error (show error message, etc.)
    }
  };

  return (
    <div>
      <h2>Login page</h2>
      <input
        type="email"
        name=""
        id=""
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        name=""
        id=""
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>login</button>
    </div>
  );
};

export default LoginPage;
