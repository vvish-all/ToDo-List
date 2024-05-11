import React, { useState } from 'react';

function AddTodoForm({ onAdd }) {
  const [description, setDescription] = useState('');
  const [duedate, setDuedate] = useState('');
  const [status, setStatus] = useState('Pending');
  const [id, setId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (description && duedate) {
      onAdd({ id: id || null, description, duedate, status });
      setDescription(description);
      setDuedate(duedate);
      setStatus('Pending');
      setId(id);
    } else {
      alert('Description and Due Date are required.');
    }
    setDescription('');
    setDuedate('');
  };

  return (
    <form id='myForm' onSubmit={handleSubmit}  >
      <h3>Add ToDo</h3>
      <div class="add-items">
      <textarea rows="7" cols="50"
        value={description}
        placeholder="Description"
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <div>
      <input
        type="date"
        value={duedate}
        onChange={(e) => setDuedate(e.target.value)}
        required
      />
      <select class="dropdown"
        value={status}
        placeholder="Status"
        onChange={(e) => setStatus(e.target.value)}
      >
      <option value="Pending">Pending</option>
      <option value="Done">Done</option>
      </select>

      <button type="submit">Add</button>
      </div>
      </div>
    </form>
  );
}

export default AddTodoForm;
