//for the user to select a chatroom

function RoomSelect({socket}){

    //change into room with id
    const change_room = () => {
        const id = document.getElementById('room_input').value;

        socket.emit('change_room', id)
    }

    return (
        <div>
            <input id="room_input"></input>
            <button onClick={change_room}>change room</button>
        </div>
    );
}

export default RoomSelect;