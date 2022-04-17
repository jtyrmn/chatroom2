import './App.css';


//components
import Login from './components/login';
import Signup from './components/signup';
import ErrorBanner from './components/error_banner';
import ChatLog from './components/chatlog';

//look at messages.js outside the /site directory for reference of this module
//except we're communicating from client to server instead of vice versa

//libraries
import axios from 'axios';
import {io} from 'socket.io-client';

import { useEffect, useState } from 'react';

//websocket stuff
const socket = io('http://localhost:3000/');


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
  const [chatMessages, setChatMessages] = useState([]);

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
        <button onClick={() => setChatMessages(chatMessages.concat(Date.now()))}>add message</button>
        <ChatLog messages={chatMessages}/>
    </div>
  );
}

export default App;