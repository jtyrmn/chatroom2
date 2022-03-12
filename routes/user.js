const express = require('express');
const router = express.Router();

const users = require('../user_database');
const ApiError = require('../error/api/api_err');
const InvalidPasswordError = require('../error/api/invalid_password_err');
const MalformedDataError = require('../error/api/malformed_data_err');
const UnauthorizedUserError = require('../error/api/unathorized_user_err');
const UsernameInUseError = require('../error/api/username_in_use_err');
const UserNotFoundError = require('../error/api/user_not_found_err');
const ServerError = require('../error/server_err');

router.get('/', (req, res) => {
    users.get_all_users()
        .then((rows) => {
            res.json(rows);
        })
        .catch((err) => {
            next(err);
        })
});

router.get('/:id', (req, res, next) => {
    users.get_user_by_id(req.params.id)
        .then((user) => {
            if (user) {
                res.json(user);
            } else {
                throw new UserNotFoundError();
            }
        })
        .catch((err) => {
            next(err);
        })
});

//go to /users/login to log into a user
//post request must contain a JSON with "username" and "password"
router.post('/login', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    
    try{
        if (!username || username == '' || !password || password == '') { //TODO: make a function to validate usernames + passwords
            throw new MalformedDataError();
        }
    }catch(err){
        next(err);
    }

    users.validate_user(username, password)
    //if correct password
    .then((valid_user) => {
        if(!valid_user){
            next(new InvalidPasswordError());
        }
        req.session.user = valid_user;
        res.send('user logged in!');
    })
    .catch(err => {
        //err is either an invalid password error or server error 
         next(err);
    });
});

router.post('/logout', (req, res) => {
    if (req.session.user) {
        delete req.session.user;
        res.send('logged out');
    } else {
        next(new UnauthorizedUserError());
    }
});

// GET request to user/signup is irrelevant
router.get('/signup', (req, res) => {
    res.send('signup page');
});

//go to /user/signup to create a new user
//post request must contain a JSON with "username" and "password"
router.post('/signup', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    try{
        if (!username || username == '' || !password || password == '') {
            throw new MalformedDataError();
        }

        users.insert_user(username, password)
        .then((result) => {
            res.send('user successfully created')
        })
        .catch((err) => {
            next(err);
        });
        
    }catch(err){
        next(err);
    }
});

module.exports = router;