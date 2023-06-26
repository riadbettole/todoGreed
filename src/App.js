import './App.css';
import jwt_decode from "jwt-decode";
import {useEffect, useState} from "react"; 
import TodoList from './Component/todoList';

function App() {
  // const [authToken, setAuthToken] = useState('');

  const [email, setEmail] = useState('');
  useEffect(() => {
    const currentURL = window.location.href;
    const params = currentURL.split('#')[1];
    const decodedToken = jwt_decode(params);
    console.log(params);
    console.log(decodedToken);
    setEmail(decodedToken.username)
  }, []);
  console.log(email);

  return (
      <div className="App">
        Bonjour <b color='pink'>{email.substring(6)}</b>
        <TodoList email={email}/>
      </div>
  );
}

export default App;
