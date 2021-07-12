const User = require('@model/bot/User.js')

class DefaultUserService {

    constructor() {

    }

    async findByUsername(username) {
        return new Promise(resolve => {
            resolve(new User(username, 'default user'));
        });
    }
}

module.exports = DefaultUserService;
