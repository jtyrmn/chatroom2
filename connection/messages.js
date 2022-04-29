const Connection = require('./connection');
const room_manager = require('../room/room_manager').instance;

const connections = require('./connection_manager');

//this file handles all the bidirectional realtime websocket communication stuff
//using socket.io wrapper
//mainly used for users messaging on platform

// call this at the beginning of the program to establish websocket behaviour
// pass in the http server instance
const initialize = (http) => {
    const io = require('socket.io')(http);

    //user connects
    io.on('connection', socket => {
        console.log(`${socket.id} connected`);
        connections.set(socket.id, new Connection());
        //when server recieves a message from a client
        //note that message names 'send_message' and such are from the client's perspective, not the server
        socket.on('send_message', message => {
            console.log(message);

            //send message to every user in the same room
            const room = connections.get(socket.id).room;

            io.sockets.in(room).emit('recieve_message', message);
        });

        //user disconnects
        socket.on('disconnect', () => {
            console.log(`${socket.id} disconnected`);
            connections.delete(socket.id);
        });

        //user wishes to change rooms
        socket.on('change_room', (room_id) => {
            room_manager.switch_to_room(socket, socket.id, room_id);
        });

        //assign to default room when initialized
        room_manager.switch_to_room(socket, socket.id, 'default');
    });

    //in order for other parts of the program to use this socket, return the instance
    return io;
}

module.exports.initialize = initialize;