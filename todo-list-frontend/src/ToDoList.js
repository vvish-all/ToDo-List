// src/ToDoList.js
import React, { useState, useEffect } from 'react';
import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from './api';

const ToDoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    const fetchTodos = async () => {
      const data = await getTodos();
      setTodos(data);
    };

    fetchTodos();
  }, []);

  const handleAddTodo = async () => {
    const todoItem = { title: newTodo, completed: false };
    const createdTodo = await createTodo(todoItem);
    setTodos([...todos, createdTodo]);
    setNewTodo('');
  };

  const handleDeleteTodo = async (id) => {
    await deleteTodo(id);
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleToggleCompletion = async (id, completed) => {
    const updatedTodo = await updateTodo(id, { completed: !completed });
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <div>
      <h1>ToDo List</h1>
      <textarea
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Add a new ToDo item..."
      />
      <button onClick={handleAddTodo}>Add</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggleCompletion(todo.id, todo.completed)}
            />
            {todo.title}
            <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ToDoList;
