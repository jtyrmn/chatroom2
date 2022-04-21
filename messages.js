//this file handles all the bidirectional realtime websocket communication stuff
//using socket.io wrapper

//mainly used for users messaging on platform

let io = undefined;

// call this at the beginning of the program to establish websocket behaviour
// pass in the http server instance
const initialize = (http) => {
    io = require('socket.io')(http);

    //user connects
    io.on('connection', socket => {
        console.log(`${socket.id} connected`);

        //when server recieves a message from a client
        //note that names 'send_message' and such are from the client's perspective, not the server
        socket.on('send_message', message => {
            console.log(message);

            //send message to every user
            io.sockets.emit('recieve_message', message);
        });

        //user disconnects
        socket.on('disconnect', () => {
            console.log(`${socket.id} disconnected`);
        });


    });
}

module.exports.initialize = initialize;