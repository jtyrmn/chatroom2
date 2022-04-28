const express = require('express');
const router = express.Router();

const room_manager = require('../room/room_manager').instance;

//handles all the /rooms url stuff

//get list of all avaliable rooms
router.get('/', (req, res) => {
       const rooms = Array.from(room_manager.rooms).map(room => ({room_id: room[0], room_name: room[1].name, creator_name: room[1].creator}));
        res.json(rooms);
});

module.exports = router;