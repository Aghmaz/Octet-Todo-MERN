import axios from "axios";

const API_URL = "http://localhost:5000/api/todos";

const getAll = async () => {
  const result = await axios.get(API_URL);
  console.log(result, result.data);
  return result.data;
};
const create = async (todo) => {
  console.log(todo, "todo");
  try {
    const response = await axios.post(API_URL, {
      text: todo.text, // Use the text from the dispatched payload
    });
    return response.data; // Return the data to be stored in the Redux store
  } catch (error) {
    console.error("Error:", error.response);
    throw error; // Ensure errors are thrown so Redux can handle them
  }
};
const update = async ({ id, updates }) => {
  const response = await axios.put(`${API_URL}/${id}`, updates);
  return response.data;
};
const remove = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data ?? id;
};

export { getAll, create, update, remove };
