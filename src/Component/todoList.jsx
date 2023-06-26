import { useState, useEffect } from 'react';

import axios from 'axios';

function TodoList({ email }) {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    fetchTodos();
  }, [email]);

  const fetchTodos = async () => {
    try {
      const response = await axios.get(
        'https://frank-escargot-48.hasura.app/api/rest/getTodos/' + email, {
        headers: {
          "x-hasura-admin-secret": '7K53r5z1dEm26jYFzTtnqwoJrEUr4mRScaAKDD0kGCx3z8zIaC2dab5LFRoQVANO'
        }
      }
      );
      console.log(response.data.todos)
      if (response.data.todos) {
        setTodos(response.data.todos);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddTodo = async () => {
    if (inputValue.trim() !== '') {
      const newTodo = {
        text: inputValue,
      };

      try {
        const url = 'https://frank-escargot-48.hasura.app/api/rest/putTodo/' + email + '/' + newTodo.text;


        
        const headers = {
          'Content-Type': 'application/json',
          'x-hasura-admin-secret': '7K53r5z1dEm26jYFzTtnqwoJrEUr4mRScaAKDD0kGCx3z8zIaC2dab5LFRoQVANO'
        };

        const data = {
          "null":"null"
        };
        console.log(email)
        console.log(newTodo.text)
        // const response = await axios.put(url, data, headers);

        const response = await axios({
          method: "post",
          url: `'https://frank-escargot-48.hasura.app/api/rest/putTodo/'${email}/${newTodo.text}`,
          headers: {
            "Content-Type": "application/json",
            'x-hasura-admin-secret': '7K53r5z1dEm26jYFzTtnqwoJrEUr4mRScaAKDD0kGCx3z8zIaC2dab5LFRoQVANO'
          },
          data: {/* Your Data Goes Here */},
        });

        if (response.data.insert_todos.affected_rows === 1) {
          setTodos([...todos, newTodo]);
          setInputValue('');
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleDeleteTodo = async (id) => {
    try {


      const response = await axios.delete(
        'https://frank-escargot-48.hasura.app/api/rest/deleteTodo/' + id,
        {
          headers: {
            "x-hasura-admin-secret": '7K53r5z1dEm26jYFzTtnqwoJrEUr4mRScaAKDD0kGCx3z8zIaC2dab5LFRoQVANO'
          }
        }
      );

      if (response.data.delete_todos.affected_rows === 1) {
        const updatedTodos = todos.filter((todo) => todo.id !== id);
        setTodos(updatedTodos);
      }
    } catch (error) {
      console.error(error);
      // Handle any error that occurred during the request
    }
  };

  return (
    <div>
      <h1>Todo List</h1>
      <input type="text" value={inputValue} onChange={handleInputChange} />
      <button onClick={handleAddTodo}>Add Todo</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.todo}
            <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;