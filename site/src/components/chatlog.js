function ChatLog({messages}){
    return (
        <div class="chatlog">
            {messages.map(message => <li>{message}</li>)}
        </div>
    )
}

export default ChatLog;