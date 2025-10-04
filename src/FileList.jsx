import React, { useState, useEffect } from "react";
import { Table, Button } from "antd";
import axios from "axios";
const FileList = () => {
  const [files, setFiles] = useState([]);
  useEffect(() => {
    axios
      .get("/api/files")
      .then((res) => res.json())
      .then((data) => setFiles(data));
  }, []);

  const columns = [
    { title: "File Name", dataIndex: "originalName" },
    { title: "Type", dataIndex: "mimeType" },
    { title: "Date", dataIndex: "date" },
    {
      title: "View",
      render: (_, record) => (
        <a
          href={`/api/files/${record.id}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          View
        </a>
      ),
    },
  ];
  return (
    <div>
      <h2>file list</h2>
      <Table columns={columns} rowKey="id" dataSource={files} />
    </div>
  );
};

export default FileList;
