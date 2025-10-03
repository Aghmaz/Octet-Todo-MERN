import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input, Button } from "antd";
import { addTodos, updateTodo } from "../features/todoSlice";

const TodoForm = () => {
  const [text, setText] = useState("");
  const todos = useSelector((state) => state.todos);
  console.log(todos, "here is latest");
  const dispatch = useDispatch();
  const handleSubmit = async () => {
    if (!text.trim()) return;
    if (todos.selectedId) {
      await dispatch(updateTodo({ id: todos.selectedId, updates: { text } }));
    } else {
      await dispatch(addTodos({ text, completed: false }));
    }
    setText("");
  };

  useEffect(() => {
    if (todos.selectedId) {
      const selected = todos.items.find((t) => t.id === todos.selectedId);
      if (selected) setText(selected.text || "");
    } else {
      setText("");
    }
  }, [todos.selectedId, todos.items]);

  return (
    <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
      <Input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="add new task"
      />
      <Button type="primary" onClick={handleSubmit}>
        {todos.selectedId ? "Update To do" : "Add To do"}
      </Button>
    </div>
  );
};

export default TodoForm;
