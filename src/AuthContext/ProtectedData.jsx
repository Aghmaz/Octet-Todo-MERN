import React, { useEffect, useState } from "react";
import useAxios from "./interceptor";

const ProtectedData = () => {
  const api = useAxios();
  const [data, setData] = useState(null);
  useEffect(() => {
    api
      .get("/profile")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      <pre> {JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default ProtectedData;
