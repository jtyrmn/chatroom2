const Room = require('./Room');
const connections = require('../connection/connection_manager');

//this class is a container for every currently active room. It will handle users switching in and out of different rooms
//global instance at bottom of file

class RoomManager{

    constructor(){
        // _rooms is a set of Room objects, indexed via room ID
        this._rooms = new Map();
    }

    get rooms(){
        return this._rooms;
    }

    //create new room and return the new room's ID
    create_room(creator, name){
        const room = new Room(creator, name);
        const index = room.id;

        this._rooms.set(index, room);
        return index;
    }

    //delete room if it exists. Pass in the ID
    remove_room(id){
        if(!this._rooms.has(id)){
            throw Error(`no room with index ${id} to be deleted`);
        }

        this._rooms.delete(id);
    }

    //return public details about the room associated with the given id.
    //does NOT include the chat log
    get_room_details(id){
        if(!this._rooms.has(id)){
            throw new Error(`no room with index ${id}`);
        }

        const room = this._rooms.get(id);
        return {name: room.name, creator: room.creator, id: room.id};
    }

    //given a websocket, socket id, and room id, switch that socket id's user's room to room id
    static switch_to_room(socket, socket_id, room_id){
        const connection = connections.get(socket_id);

        socket.leave(connection.room);
        socket.join(room_id);

        connection.room  = room_id;
        
        console.log(socket.rooms)
    }
}

//instance of RoomManager to be shared around the program
const instance = new RoomManager();
instance.create_room('bingus', 'no name')
instance.create_room('gorbo', 'n/a')
instance.create_room('glubglub', 'eek')

module.exports = RoomManager;
module.exports.instance = instance;