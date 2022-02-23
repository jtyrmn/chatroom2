const cookieParser = require('cookie-parser');
const session = require('express-session');
const express = require('express');
const app = express();
port = 3001

const user = require('./routes/user');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(session({secret: "very secret secret!"}));

app.get('/', function(req, res){
    if(req.session.user != undefined){
        res.send(`welcome back ${req.session.user.username}. Your password is ${req.session.user.password}`);
    }else{
        res.send('unrecognized user');
    }
});

app.use('/user/', user);

app.listen(3001, () => {
    console.log('server started');
});