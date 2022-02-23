const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json(users);
});

const users = [];

router.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    if(!username || !password){
        res.status(404).send('wrong data, loser');
        return;
    }

    const user = users.find((u) => u.username === username);
    if(user == undefined){
        res.status(404).send('user not found');
        return;
    }

    if(user.password !== password){
        res.status(404).send('incorrect password');
        return;
    }

    req.session.user = user;
    res.send('user logged in!');
});

router.post('/logout', (req, res) => {
    if(req.session.user){
        delete req.session.user;
        res.send('logged out');
    }else{
        res.status(404).send('no user to log out of...');
    }
})

router.get('/signup', (req, res) => {
    res.send('signup page');
});

router.post('/signup', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    if(!username || !password){
        res.status(404).send('wrong data, loser');
        return;
    }

    if(users.find((user) => user.username === username) != undefined){
        res.status(404).send('username is already taken');
        return;
    }

    const new_user = {username: username, password: password};
    users.push(new_user);
    res.send('user created!')
})

module.exports = router;