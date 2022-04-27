//container to represent the state of a active websocket connection. Includes data such as the username it's associated with, the room it's in, etc.
//does not contain the socket ID itself, this class is meant to be used within a hashmap (in messages.js at the time of writing this) indexed via that ID
//doesn't have much functionality on it's own, it's just a container.

class Connection{
    constructor(){
        //user's current chatroom
        this.room = 'default';

        //a username (if it becomes known to the server who this connection is)
        this.username = undefined;

        //add more state info later...
    }
}

module.exports = Connection;