import React, { useState } from "react";
import { Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
const UploadForm = ({ onUploadSuccess }) => {
  const [loading, setLoading] = useState(false);
  const API_URL = "http://localhost:5000/upload";
  const props = {
    name: "file",
    action: `${API_URL}`, //pending task
    customRequest: async ({ file }) => {
      setLoading(true);
      try {
        const formData = new FormData();
        formData.append("file", file);
        const response = await axios.post(`${API_URL}`, formData);
        console.log(response, "response");
        message.success("Upload successful");
        setLoading(false);
        onUploadSuccess(response.data.file);
        onSuccess();
      } catch (error) {
        setLoading(false);
        message.error("Upload failed");
      }
    },
  };
  return (
    <div>
      <h2>upload your file</h2>
      <Upload {...props} showUploadList={false}>
        <Button icon={<UploadOutlined />} loading={loading}>
          Upload
        </Button>
      </Upload>
    </div>
  );
};

export default UploadForm;
