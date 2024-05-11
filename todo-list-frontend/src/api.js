// src/api.js
const API_URL = 'http://localhost:8080'; //base APIs' url

export const getTodos = async () => {
  const response = await fetch(`${API_URL}/todo`);
  return response.json();
};

export const getTodoById = async (id) => {
  const response = await fetch(`${API_URL}/todo/${id}`);
  return response.json();
};

export const createTodo = async (todoItem) => {
  const response = await fetch(`${API_URL}/todo`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(todoItem),
  });
  return response.json();
};

export const updateTodo = async (id, todoItem) => {
  const response = await fetch(`${API_URL}/todo/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(todoItem),
  });
  return response.json();
};

export const deleteTodo = async (id) => {
  const response = await fetch(`${API_URL}/todo/${id}`, {
    method: 'DELETE',
  });
  return response.json();
};
