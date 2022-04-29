import { useEffect, useState } from "react";
import axios from "axios";

//for the user to select a chatroom

function RoomSelect({socket}){
    const [rooms, setRooms] = useState([]);

    //change into room with id
    const change_room = (id) => {
        socket.emit('change_room', id);
    }

    useEffect(() => {
        axios.get('/rooms')
        .then(response => {
            setRooms(response.data);
        })
        .catch(err => {
            document.getElementById('room-list').innerHTML = `unable to retrieve room data\n ${err}`;
        });
    }, []);

    return (
        <div id="room-list">
            Rooms
            {
                rooms.map(room => <li key={room.room_id}> {room.room_id}:{room.creator_name}:{room.room_name} <button onClick={() => {change_room(room.room_id)}}>join</button></li>)
            }
        </div>
    );
}

export default RoomSelect;