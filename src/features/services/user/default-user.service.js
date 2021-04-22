const User = require('@model/bot/User.js')

class DefaultUserService {

    constructor() {
        console.log('using default Userservice');
    }

    async findByUsername(username) {
        return new Promise(resolve => {
            resolve(new User(username, 'default user'))
            resolve(user);
        });
    }
}

module.exports = DefaultUserService;
