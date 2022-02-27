const express = require('express');
const router = express.Router();

const db = require('../database');

router.get('/', (req, res) => {
    db.get_all_users()
        .then((rows) => {
            res.json(rows);
        })
        .catch((err) => {
            //log error here if I had a proper logger
            res.sendStatus(500);
        })
});

router.get('/:id', (req, res) => {
    db.get_user_by_id(req.params.id)
        .then((user) => {
            if(user){
                res.json(user);
            }else{
                res.status(404).send('user not found');
            }
        })
        .catch((err) => {
            res.sendStatus(500);
        })
});

//go to /users/login to log into a user
//post request must contain a JSON with "username" and "password"
router.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    if(!username || username == ''|| !password || password == ''){ //dTODO: make a function to validate usernames + passwords
        res.status(400).send('wrong data');
        return;
    }

    db.get_user_by_username(username)
    .then((user) => {
        if(!user){
            res.status(404).send('user not found');
            return;
        }
    
        if(user.password !== password){
            res.status(400).send('incorrect password');
            return;
        }
    
        req.session.user = user;
        res.send('user logged in!');
    })
    .catch((err) => {
        res.sendStatus(500);
    });
});

router.post('/logout', (req, res) => {
    if(req.session.user){
        delete req.session.user;
        res.send('logged out');
    }else{
        res.status(404).send('no user to log out of...');
    }
});

// GET request to user/signup is irrelevant
router.get('/signup', (req, res) => {
    res.send('signup page');
});

//go to /user/signup to create a new user
//post request must contain a JSON with "username" and "password"
router.post('/signup', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    if(!username || username == ''|| !password || password == ''){
        res.status(400).send('wrong data');
        return;
    }

    db.insert_user(username, password).then((result) => {
        res.send('user successfully created')
    })
    .catch((err) => {
        if(err.code && err.code == "23505"){ // postgres error code for unique_violation
            //aka the insert failed because username matched another user's username
            res.status(404).send('username already in use');
        }else{
            res.status(500).send('user created failed due to server error');
        }
    });
});

module.exports = router;