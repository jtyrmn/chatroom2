const postgres = require('pg');
const encryption = require('bcrypt');
const assert = require('assert');

const salt_rounds = Number(process.env.PASSWORD_SALT_ROUNDS) || undefined;
if(!salt_rounds){
    throw('dotenv PASSWORD_SALT_ROUNDS not defined');
}

const pool = new postgres.Pool({
    user:process.env.DB_USER,
    host:process.env.DB_HOST,
    database:process.env.DB,
    password:process.env.DB_PASSWORD
});

pool.connect();

async function get_all_users() {
    return (await pool.query('select * from users')).rows;
}

async function get_user_by_id(id) {
    const user = (await pool.query('select * from users where id = $1', [id])).rows;
    if(user.length == 0){
        return undefined;
    }
    return user[0];
}

async function get_user_by_username(name) {
    const user = (await pool.query('select * from users where username = $1', [name])).rows;
    if(user.length == 0){
        return undefined;
    }
    return user[0];
}

//for logging in. resolves to the user if valid and undefined otherwise 
async function validate_user(username, password) {
    const user = await get_user_by_username(username);
    if(!user){
        //username doesnt exist
        throw new Error('username not found');
    }
    const is_valid = await encryption.compare(password, user.password);
    if(is_valid){
        return user;
    }else{
        throw new Error('wrong password');
    }
}

//make sure to catch this funct's errors and look though error.code to see the cause of a fail (non-unique username, etc) https://www.postgresql.org/docs/10/errcodes-appendix.html
//I figured that is the best way to do this w/o unnecessary queries or complex promise chains
async function insert_user(username, password) {
    //hash password
    var hashed_password = undefined;
    await encryption.hash(password, salt_rounds)
    .then(hash => {
        hashed_password = hash;
    });
    //if for some reason the above hash value is null or something and an error isn't thrown:
    assert(hashed_password && hashed_password != '', 'cannot enter empty password into db');

    return (await pool.query('insert into users (username, password) values ($1, $2)', [username, hashed_password]));
}

module.exports.get_all_users = get_all_users;
module.exports.get_user_by_id = get_user_by_id;
module.exports.get_user_by_username = get_user_by_username;
module.exports.validate_user = validate_user;
module.exports.insert_user = insert_user;