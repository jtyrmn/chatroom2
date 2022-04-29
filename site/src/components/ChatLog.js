import { useEffect, useState } from 'react';

// displays a log of messages
function ChatLog({messages}) {
    return (
        <div className='chat-log'>
            {
                messages.map((message) => <li key={Math.random() /*probably not good practice, but is temporary*/}>{message}</li>)
            }
        </div>
    );
}

export default ChatLog;