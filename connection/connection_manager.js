//we keep track of the state of every (online) user with this object
//giving this container it's own file so it can be accessed everywhere without worry of circular dependencies
const connections = new Map();

module.exports = connections;