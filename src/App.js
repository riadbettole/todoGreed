import './App.css';
import jwt_decode from "jwt-decode";
import {useEffect, useState} from "react"; 

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

  return (
      <div className="App">
        Bonjour {email}
      </div>
  );
}

export default App;
