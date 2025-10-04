import React from "react";
import "./App.css";
import { Route, Routes } from "react-router";
import Home from "./Home";
import FilesUpload from "./FilesUpload";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/upload" element={<FilesUpload />} />
    </Routes>
  );
}

export default App;
