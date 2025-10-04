import React, { useState, useEffect } from "react";
import { Table, Button, Image, Modal } from "antd";
import axios from "axios";

const FileList = () => {
  const [files, setFiles] = useState([]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const API_URL = "http://localhost:5000/files";

  useEffect(() => {
    axios
      .get(API_URL)
      .then((res) => setFiles(res.data))
      .catch((error) => console.error("Error fetching files:", error));
  }, []);

  const isImage = (mimeType) => {
    return mimeType && mimeType.startsWith("image/");
  };

  const handlePreview = (record) => {
    setPreviewImage(`http://localhost:5000${record.path}`);
    setPreviewVisible(true);
  };

  const columns = [
    {
      title: "Preview",
      dataIndex: "preview",
      width: 100,
      render: (_, record) => {
        if (isImage(record.mimeType)) {
          return (
            <Image
              width={60}
              height={60}
              src={`http://localhost:5000${record.path}`}
              style={{ objectFit: "cover", borderRadius: "4px" }}
              preview={false}
            />
          );
        }
        return (
          <div
            style={{
              width: 60,
              height: 60,
              background: "#f0f0f0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "4px",
            }}
          >
            📄
          </div>
        );
      },
    },
    {
      title: "File Name",
      dataIndex: "originalName",
      ellipsis: true,
      width: 200,
    },
    { title: "Type", dataIndex: "mimeType", width: 120 },
    {
      title: "Date",
      dataIndex: "date",
      width: 150,
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Actions",
      width: 100,
      render: (_, record) => (
        <Button
          type="primary"
          size="small"
          onClick={() => handlePreview(record)}
        >
          {isImage(record.mimeType) ? "Preview" : "View"}
        </Button>
      ),
    },
  ];

  return (
    <div>
      <h2>File List</h2>
      <Table
        columns={columns}
        rowKey="id"
        dataSource={files}
        pagination={{ pageSize: 10 }}
        scroll={{ x: 600 }}
      />

      <Modal
        open={previewVisible}
        title="File Preview"
        footer={null}
        onCancel={() => setPreviewVisible(false)}
        width={800}
        centered
      >
        {previewImage && (
          <div style={{ textAlign: "center" }}>
            {isImage(
              files.find(
                (f) => `http://localhost:5000${f.path}` === previewImage
              )?.mimeType
            ) ? (
              <Image
                src={previewImage}
                style={{ maxWidth: "100%", maxHeight: "70vh" }}
                preview={{
                  mask: "Click to zoom",
                }}
              />
            ) : (
              <div>
                <p>File preview not available for this file type.</p>
                <Button
                  type="primary"
                  href={previewImage}
                  target="_blank"
                  download
                >
                  Download File
                </Button>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default FileList;
