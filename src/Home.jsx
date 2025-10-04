import React, { useEffect } from "react";
import TodoForm from "./components/todoForm";
import TodoList from "./components/todoList";
import { Layout, Typography } from "antd";
import { useDispatch } from "react-redux";
import { fetchTodos } from "./features/todoSlice";

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  return (
    <Layout style={{ minHeight: "100vh", padding: 24 }}>
      <Typography.Title level={2}>To-Do List </Typography.Title>
      <TodoForm />
      <TodoList />
    </Layout>
  );
};

export default Home;
