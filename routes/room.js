const express = require('express');
const router = express.Router();

//"database" of rooms
const rooms = [];

class Room{
    constructor(name){
        this.name = name;
        this.messages = [];
    }
};

//get all current rooms
router.get('/', (req, res) => {
    res.json(rooms);
});

//create a new room
//send JSON {name: ..} here
router.post('/', (req, res) => {
    const room_name = req.body.name;
    if(room_name === undefined){
        res.status(404).send('missing room name');
        return;
    }

    if(rooms.find((room) => room_name === room.name) != undefined){
        res.status(404).send('room name already in use');
        return;
    }

    const new_room = new Room(room_name);
    rooms.push(new_room);
    res.send('created new room')
});

//not implementing POST to certain rooms (sending messages) because that will be done using websockets later, not with a shoddy REST api

//get a specific room via name
//probably gonna give rooms proper IDs later instead of indexing them via their names
router.get('/:name', (req,res) => {
    const name = req.params.name;
    if(name === undefined){
        res.status(404).send('no name provided');
        return;
    }

    const room = rooms.find((room) => room.name === name);
    if(room !== undefined){
        res.json(room);
    }else{
        res.status(404).send('cannot find that room')
    }
});

module.exports = router;