import React from "react";
import "./App.css";
import { Route, Routes } from "react-router";
import Home from "./Home";
import FilesUpload from "./FilesUpload";
import LoginPage from "./AuthContext/LoginPage";
import ProtectedData from "./AuthContext/ProtectedData";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/upload" element={<FilesUpload />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/protected" element={<ProtectedData />} />
    </Routes>
  );
}

export default App;
