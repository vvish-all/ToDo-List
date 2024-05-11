import React, { useState } from "react";

function TodoList({ todos, onDelete, onUpdate, onUpdateStatus }) {
  const [editingTodos, setEditingTodos] = useState({});

  const handleFieldChange = (id, field, value) => {
    setEditingTodos((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
      },
    }));
  };

  const handleUpdate = (id) => {
    const updatedTodo = editingTodos[id];
    onUpdate({ ...updatedTodo, id });
    setEditingTodos((prev) => {
      const { [id]: _, ...rest } = prev;
      return rest;
    });
  };

  return (
    <ul>
      {todos.map((todo) => {
        const isEditing = editingTodos.hasOwnProperty(todo.id);
        const editableTodo = isEditing ? editingTodos[todo.id] : todo;

        return (
          <li key={todo.id} className="todo-item">
            <textarea
              value={editableTodo.description}
              onChange={(e) =>
                handleFieldChange(todo.id, "description", e.target.value)
              }
            />
            <input
              type="date"
              value={editableTodo.duedate}
              onChange={(e) =>
                handleFieldChange(todo.id, "duedate", e.target.value)
              }
            />
            <select
              value={editableTodo.status}
              onChange={(e) =>
                handleFieldChange(todo.id, "status", e.target.value)
              }
            >
              <option value="Pending">Pending</option>
              <option value="Done">Done</option>
            </select>
            <button onClick={() => handleUpdate(todo.id)} disabled={!isEditing}>
              Update
            </button>
            <button
              onClick={() => onUpdateStatus(todo.id)}
              disabled={todo.status === "Done"}
            >
              Mark as Done
            </button>
            <button onClick={() => onDelete(todo.id)}>Delete</button>
          </li>
        );
      })}
    </ul>
  );
}

export default TodoList;
