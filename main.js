require('dotenv').config()

const cookieParser = require('cookie-parser');
const session = require('express-session');
const express = require('express');
const app = express();

const user_route = require('./routes/user');
const room_route = require('./routes/room');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(session({secret: "very secret secret!"}));

//basic login. Displays username + password (security is not a concern yet)
app.get('/', function(req, res){
    if(req.session.user != undefined){
        res.send(`welcome back ${req.session.user.username}. Your password is ${req.session.user.password}`);
    }else{
        res.send('unrecognized user');
    }
});

//user route deals with everything logging in, logging out, etc
app.use('/user', user_route);

//chatroom route deals with rooms and their messages
app.use('/room', room_route);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log('server started on port ', PORT);
});