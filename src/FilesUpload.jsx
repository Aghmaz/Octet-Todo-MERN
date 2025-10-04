import React from "react";
import UploadForm from "./UploadForm";
import FileList from "./FileList";
import { Layout, Typography } from "antd";
const FilesUpload = () => {
  return (
    <Layout style={{ minHeight: "100vh", padding: 24 }}>
      <Typography.Title level={2}>Files Upload system </Typography.Title>
      <UploadForm onUploadSuccess={() => window.location.reload()} />
      <FileList />
    </Layout>
  );
};

export default FilesUpload;
