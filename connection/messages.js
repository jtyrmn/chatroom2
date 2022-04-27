const Connection = require('./connection');

//this file handles all the bidirectional realtime websocket communication stuff
//using socket.io wrapper
//mainly used for users messaging on platform

//we keep track of the state of every (online) user with this object
//connections can be accessed anywhere in the program by require()
const connections = new Map();

// call this at the beginning of the program to establish websocket behaviour
// pass in the http server instance
const initialize = (http) => {
    const io = require('socket.io')(http);

    //user connects
    io.on('connection', socket => {
        console.log(`${socket.id} connected`);
        connections.set(socket.id, new Connection());
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
            connections.delete(socket.id);
        });


    });

    //in order for other parts of the program to use this socket, return the instance
    return io;
}

module.exports.initialize = initialize;
module.exports.connections = connections;