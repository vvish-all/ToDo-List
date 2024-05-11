import React, { useEffect, useState } from 'react';
import AddTodoForm from './components/AddTodoForm';
import TodoList from './components/TodoList';

const API_URL = 'http://localhost:8080/todo'; // Adjust to your backend's URL



function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('All'); // Default filter
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  useEffect(() => {
    fetchTodos();
  }, []);

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  const fetchTodos = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Failed to fetch ToDos');
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error('Error fetching ToDos:', error);
      alert('An error occurred while fetching ToDos.');
    }
  };
  const getTodo = async (id) => {
      try {
        const response = await fetch(`${API_URL}/${id}`, {
          method: 'GET',
        });
        if (!response.ok) {
          console.error('Error fetching ToDo:', id);
        }
      } catch (error) {
        console.error('Error fetching ToDo:', error);
        alert('An error occurred while fetching the ToDo.');
      }
    };

  const addTodo = async (todo) => {
    try {
        const id = todo.id;
        const resp = await fetch(`${API_URL}/${todo.id}`, {
          method: 'GET',
        });
        if (resp.ok) {
          alert('ToDo already exists for id: ', {id});
        }

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(todo),
      });

      if (response.ok) {
        fetchTodos(); // Refresh the list
      } else {
        alert('Failed to add ToDo');
      }
    } catch (error) {
      console.error('Error adding ToDo:', error);
      alert('An error occurred while adding the ToDo.');
    }
  };

  const updateTodo = async (todo) => {
    try {
      const response = await fetch(`${API_URL}/${todo.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(todo),
      });

      if (response.ok) {
        fetchTodos(); // Refresh the list
      } else {
        alert('Failed to update ToDo');
      }
    } catch (error) {
      console.error('Error updating ToDo:', error);
      alert('An error occurred while updating the ToDo.');
    }
  };

  const deleteTodo = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchTodos(); // Refresh the list
      } else {
        alert('Failed to delete ToDo');
      }
    } catch (error) {
      console.error('Error deleting ToDo:', error);
      alert('An error occurred while deleting the ToDo.');
    }
  };

  const updateTodoStatus = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'Done' }),
      });

      if (response.ok) {
        fetchTodos(); // Refresh the list
      } else {
        alert('Failed to update ToDo');
      }
    } catch (error) {
      console.error('Error updating ToDo status:', error);
      alert('An error occurred while updating the ToDo status.');
    }
  };

  const filteredTodos = filter === 'All' ? todos : todos.filter(todo => todo.status === filter);

  return (
   <div className={isDarkTheme ? 'dark-theme' : 'light-theme'}>
        <div className="app-container">
        <div className="toggle-theme-button">
        <button  onClick={toggleTheme} >
                  Toggle {isDarkTheme ? 'Light' : 'Dark'} Theme
        </button>
        </div>
          <h1>ToDo List</h1>
          <div className="todo-actions" >
            <div>
                {/*<button onClick={fetchTodos}>Fetch All ToDos</button>*/}
            </div>
            <select
              className="dropdown"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="All">All</option>
              <option value="Pending">Pending</option>
              <option value="Done">Done</option>
            </select>
          </div>
          <div class="add-form">
            <AddTodoForm onAdd={addTodo} />
          </div>
          <TodoList
            todos={filteredTodos}
            onDelete={deleteTodo}
            onUpdate={updateTodo}
            onUpdateStatus={updateTodoStatus}
          />
        </div>
   </div>
  );
}

export default App;
