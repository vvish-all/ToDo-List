
import React, { useState, useEffect } from 'react';

function UpdateTodoForm({ onUpdate }) {
  const [id, setId] = useState('');
  const [description, setDescription] = useState('');
  const [duedate, setDuedate] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (id) {
      fetchTodoDetails(id);
    }
  }, [id]); // Effect triggers when `id` changes

  const fetchTodoDetails = async (todoId) => {
    const API_URL = 'http://localhost:8080/todo'; // Adjust to your backend's URL
    try {
      const response = await fetch(`${API_URL}/${todoId}`);
      if (response.ok) {
        const todo = await response.json();
        setDescription(todo.description || '');
        setDuedate(todo.duedate || '');
        setStatus(todo.status || '');
      }
//      else {
//        alert('ToDo not found');
//      }
    } catch (error) {
      console.error('Error fetching ToDo details:', error);
      alert('An error occurred while fetching the ToDo details.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!id) {
      alert('ID is required for updating.');
      return;
    }

    const updatedTodo = {
      id,
      description,
      duedate,
      status,
    };

    onUpdate(updatedTodo); // Call parent component's update handler
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Update ToDo</h3>
      <input
        type="text"
        value={id}
        placeholder="ID"
        onChange={(e) => setId(e.target.value)}
        required
      />
      <input
        type="text"
        value={description}
        placeholder="Description"
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="date"
        value={duedate}
        onChange={(e) => setDuedate(e.target.value)}
      />
      <input
        type="text"
        value={status}
        placeholder="Status"
        onChange={(e) => setStatus(e.target.value)}
      />
      <button type="submit">Update</button>
    </form>
  );
}

export default UpdateTodoForm;
