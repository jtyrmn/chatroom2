import './App.css';
import Login from './components/login';
import Signup from './components/signup';
import ErrorBanner from './components/error_banner';
import { useEffect, useState } from 'react';
import axios from 'axios';

function DisplayUser({user}) {
  return (
    <div>
      <h2>{user.id + ': ' + user.username}</h2>
    </div>
  );
}

function App() {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState('...');
  const [errorMessage, setErrorMessage] = useState(undefined);

  useEffect(() => {
    axios.get('/user')
    .then(response => {
      setUsers(response.data);
    })
    .catch(error => {
      console.log(error);
    });
  }, []);

  return (
    <div>
      <p>tetetetetetetttttttttttt hello {username}</p>
        <ErrorBanner message={errorMessage}/>
        <Login usernameState={setUsername} errorMessageState={setErrorMessage}/>
        <Signup usernameState={setUsername} errorMessageState={setErrorMessage}/>
        {users.map(user => <li key = {user.id}><DisplayUser user={user} /></li>)}
    </div>
  );
}

export default App;