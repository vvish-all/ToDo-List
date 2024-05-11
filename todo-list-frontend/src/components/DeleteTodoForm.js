import React, { useState } from "react";

function DeleteTodoForm({ onDelete }) {
  const [id, setId] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      onDelete(id);
      setId("");
    } else {
      alert("ID is required for deleting.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Delete ToDo</h3>
      <input
        type="text"
        value={id}
        placeholder="ID"
        onChange={(e) => setId(e.target.value)}
        required
      />
      <button type="submit">Delete</button>
    </form>
  );
}

export default DeleteTodoForm;
