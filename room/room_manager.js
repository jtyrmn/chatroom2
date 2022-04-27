const Room = require('./Room');

//this class is a container for every currently active room. It will handle users switching in and out of different rooms

class RoomManager{

    //pass in the websocket instance
    constructor(socket){
        this._socket = socket;

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
}

module.exports = RoomManager