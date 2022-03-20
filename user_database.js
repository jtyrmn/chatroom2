const postgres = require('pg');
const encryption = require('bcrypt');
const assert = require('assert');
const UsernameInUseError = require('./error/api/username_in_use_err');
const UsernameNotFoundError = require('./error/api/user_not_found_err');
const InvalidPasswordError = require('./error/api/invalid_password_err');
const ServerError = require('./error/server_err');

const salt_rounds = Number(process.env.PASSWORD_SALT_ROUNDS) || undefined;
assert(salt_rounds, 'PASSWORD_SALT_ROUNDS not defined');

const pool = new postgres.Pool({
    user:process.env.DB_USER,
    host:process.env.DB_HOST,
    database:process.env.DB,
    password:process.env.DB_PASSWORD
});

pool.connect();

async function get_all_users() {
    try{
        return (await pool.query('select * from users')).rows;
    }catch(err){
        throw new ServerError(err.message);
    }
}

async function get_user_by_id(id) {
    try{
        const user = (await pool.query('select * from users where id = $1', [id])).rows;
        if(user.length == 0){
            return undefined;
        }
        return user[0];
    }catch(err){
        throw new ServerError(err);
    }
}

async function get_user_by_username(name) {
    try{
        const user = (await pool.query('select * from users where username = $1', [name])).rows;

        if(user.length == 0){
            return undefined;
        }
        return user[0];
    }catch(err){
        throw new ServerError(err);
    }
}

//for logging in. resolves to the user if valid and undefined otherwise 
async function validate_user(username, password) {
    const user = await get_user_by_username(username);
    if(!user){
        //username doesnt exist
        throw new UsernameNotFoundError(username);
    }
    const is_valid = await encryption.compare(password, user.password);
    return is_valid ? user : undefined;
}

async function insert_user(username, password) {
    //hash password
    var hashed_password = undefined;
    await encryption.hash(password, salt_rounds)
    .then(hash => {
        hashed_password = hash;
    });
    //if for some reason the above hash value is null or something and an error isn't thrown:
    assert(hashed_password && hashed_password != '', 'cannot enter empty password into db');

    try{
        return (await pool.query('insert into users (username, password) values ($1, $2)', [username, hashed_password]));
    }catch(err){
        if(err.code = '23505'){ //error code for username already exists in database
            throw new UsernameInUseError(username);
        }
        throw new ServerError(err);

    }
}

module.exports.get_all_users = get_all_users;
module.exports.get_user_by_id = get_user_by_id;
module.exports.get_user_by_username = get_user_by_username;
module.exports.validate_user = validate_user;
module.exports.insert_user = insert_user;