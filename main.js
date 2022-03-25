require('dotenv').config()

const cookieParser = require('cookie-parser');
const session = require('express-session');
const express = require('express');
const app = express();

const user_route = require('./routes/user');
const room_route = require('./routes/room');

const error_logger = require('./log/error_logger')

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
}));

app.use((req, res, next) => {
    console.log(req.url);
    next();
});

app.get('/', function(req, res){
    console.log(`${req.url} called`);
    res.send('test');
});

//user route deals with everything logging in, logging out, etc
app.use('/user', user_route);

//chatroom route deals with rooms and their messages
app.use('/room', room_route);

//error handling
app.use(error_logger);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log('server started on port ', PORT);
});