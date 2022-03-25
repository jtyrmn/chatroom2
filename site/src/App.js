import './App.css';
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

  useEffect(() => {
    axios.get('/user')
    .then(response => {
      setUsers(response.data);
    })
    .catch(error => {
      console.log(error);
    });
  });

  return (
    <div>
      <p>tetetetetetetttttttttttt</p>
        {users.map(user => <DisplayUser user={user} />)}
    </div>
  );
}

export default App;
