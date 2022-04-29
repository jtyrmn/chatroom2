import './App.css';


//components
import Login from './components/login';
import Signup from './components/signup';
import ErrorBanner from './components/error_banner';
import ChatBox from './components/ChatBox';
import ChatLog from './components/ChatLog';
import RoomSelect from './components/RoomSelect';

//look at messages.js outside the /site directory for reference of this module
//except we're communicating from client to server instead of vice versa

//libraries
import axios from 'axios';
import {io} from 'socket.io-client';

import { useEffect, useState } from 'react';

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
  const [socket, setSocket] = useState(undefined);
  const [messages, setMessages] = useState([]);

  //creating the websocket connection
  useEffect(() => {
    const newSocket = io();

    //also, for when we recieve messages
    newSocket.on('recieve_message', message => {
      setMessages((current_array) => current_array.concat(message));
    });

    //whenever we attempt change rooms, the server will send us an acknowledgement of whether it was successful or not
    newSocket.on('change_room_ack', ack => {
      console.log('recieved ACK from server\n', ack);
      //if the ACK was successful, it also contains the new room's chats
      try{
        if(!ack.success){
          throw new Error();
        }
        setMessages(ack.chat_log)
      }catch(e){
        console.log(e);
        setMessages([]);
      }
    });

    setSocket(newSocket);

    return () => newSocket.close();
  }, [setSocket, setMessages]);

  return (
    <div>
      <p>tetetetetetetttttttttttt hello {username}</p>
        <ErrorBanner message={errorMessage}/>
        <Login usernameState={setUsername} errorMessageState={setErrorMessage}/>
        <Signup usernameState={setUsername} errorMessageState={setErrorMessage}/>
        <ChatBox socket={socket}/>
        <ChatLog messages={messages}/>
        <RoomSelect socket={socket}/>

    </div>
  );
}

export default App;