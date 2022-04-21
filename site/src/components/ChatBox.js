//simple chat box where you enter message and send

function ChatBox({socket}) {

    //send a message to the server
    const send_message = () => {
        const message = document.getElementById('message_box').value;
        socket.emit('send_message', message);
    };

    return (
        <div className="chatbox">
            <input id='message_box'></input>
            <button onClick={send_message}>send</button>
        </div>
    );
}

export default ChatBox;