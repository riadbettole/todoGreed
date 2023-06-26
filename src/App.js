import './App.css';
import jwt_decode from "jwt-decode";
import {useEffect, useState} from "react"; 
import TodoList from './Component/todoList';

function App() {
  // const [authToken, setAuthToken] = useState('');

  const [email, setEmail] = useState('');
  useEffect(() => {
    const currentURL = window.location.href;
    if (currentURL === 'https://main.dy509vqd9o6ho.amplifyapp.com/') {
      window.location.href = 'https://todolist.auth.eu-north-1.amazoncognito.com/oauth2/authorize?client_id=315hblo6ekas8grvnvhh50aagm&response_type=token&scope=openid&redirect_uri=https%3A%2F%2Fmain.dy509vqd9o6ho.amplifyapp.com';
    }
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
