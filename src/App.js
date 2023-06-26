import './App.css';
import jwt_decode from "jwt-decode";
import {useEffect} from "react"; 

function App() {
  // const [authToken, setAuthToken] = useState('');

  useEffect(() => {
    const currentURL = window.location.href;
    const params = currentURL.split('#')[1];
    const decodedToken = jwt_decode(params);

    console.log(decodedToken);

  }, []);

  return (
      <div className="App">
        Bonjour
      </div>
  );
}

export default App;
