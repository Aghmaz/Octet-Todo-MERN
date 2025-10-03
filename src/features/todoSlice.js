import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAll, create, update, remove } from "./todoService";
export const fetchTodos = createAsyncThunk("todos/fetchAll", getAll);
export const addTodos = createAsyncThunk("todo/add", async (todo) => {
  return await create(todo);
});
export const updateTodo = createAsyncThunk(
  "todos/update",
  async ({ id, updates }) => {
    return await update({ id, updates });
  }
);
export const deleteTodo = createAsyncThunk("todos/delete", async (id) => {
  return await remove(id);
});

const todoSlice = createSlice({
  name: "todos",
  initialState: { items: [], loading: false, selectedId: null },
  reducers: {
    checkedList: (state, action) => {
      const idx = state.items.findIndex((t) => t.id === action.payload.id);
      if (idx !== -1) state.items[idx] = action.payload;
    },
    selectTodoForEdit: (state, action) => {
      state.selectedId = action.payload; // id or null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(addTodos.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        const idx = state.items.findIndex((t) => t.id === action.payload.id);
        if (idx !== -1) state.items[idx] = action.payload;
        state.selectedId = null;
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.items = state.items.filter((t) => t.id !== action.meta.arg);
      });
  },
});
export const { checkedList, selectTodoForEdit } = todoSlice.actions;
export default todoSlice.reducer;
