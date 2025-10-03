import React from "react";
import { List, Checkbox, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  updateTodo,
  deleteTodo,
  checkedList,
  selectTodoForEdit,
} from "../features/todoSlice";
const TodoList = () => {
  const todos = useSelector((state) => state.todos);

  const dispatch = useDispatch();

  return (
    <div>
      <List
        bordered
        dataSource={(todos.items && todos.items) || []}
        renderItem={(todo) => (
          <List.Item
            actions={[
              <Button danger onClick={() => dispatch(deleteTodo(todo.id))}>
                {" "}
                Delete
              </Button>,
            ]}
          >
            <Checkbox
              checked={todo.completed}
              onChange={(e) => {
                dispatch(
                  checkedList({
                    id: todo.id,
                    completed: e.target.checked,
                    text: todo.text,
                  })
                );
                if (e.target.checked) {
                  dispatch(selectTodoForEdit(todo.id));
                } else if (todos.selectedId === todo.id) {
                  dispatch(selectTodoForEdit(null));
                }
              }}
            >
              {todo.text}
            </Checkbox>
          </List.Item>
        )}
      />
    </div>
  );
};

export default TodoList;
