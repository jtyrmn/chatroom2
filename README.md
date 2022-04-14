# chatroom2
new version of old chatroom project

# about
This is a simple program that hosts a chatroom website using Node, React (planning), and PostGreSQL.

# installation
clone the project
```
git clone https://github.com/jtyrmn/chatroom2
```

install dependencies
```
npm install
```

## dotenv
You need to have a `.env` file in the repository's root directory. Edit the information in it as you wish.
```
PORT=3001

DB_USER=
DB_PASSWORD=
DB_HOST=
DB=

PASSWORD_SALT_ROUNDS=10 //for creating user account's passwords

SESSION_SECRET= //some secret string
```

# running
to start the server, simply run `npm start`. The api can be accessed at `localhost:PORT` where PORT is defined in your .env file. View `/routes` for information on the api.

to start the webpage server, cd into `site/` and run `npm start`. The React server is located at `localhost:3000`