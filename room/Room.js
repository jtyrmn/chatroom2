const crypto = require('crypto');

//message container
class Message{
    constructor(user_id, content){
        this.user_id = user_id; //user id
        this.content = content;
    }
}

//class for chatrooms. Stores name, ID, etc of each room and most importantly, a log of chats

class Room{
    constructor(creator, name){
        this._creator = creator;
        this._name = name;

        //generate an id for this class
        this._id = crypto.randomBytes(3).toString('hex')

        this._log = [] //will probably use a skip list or similar instead
    }

    get creator(){
        return this._creator;
    }
    get name(){
        return this._name;
    }
    get id(){
        return this._id;
    }

    getChats() {
        return this._log;
    }

    //use this when posting a new message to room
    addMessage(message){
        this._log.push(message);  //TODO: dedicated message objects
    }
}

module.exports = Room;
