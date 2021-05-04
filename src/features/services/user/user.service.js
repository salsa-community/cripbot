
const VtigerUserService = require('@service/user/vtiger-user.service')
const DefaultUserService = require('@service/user/default-user.service')

const config = require('@config');

let userservice = null;
config.bot.app.userservice;

if (config.bot.app.userservice == 'vtiger') {
    userservice = new VtigerUserService();
} else {
    userservice = new DefaultUserService();
}

console.log('User service: ' + config.bot.app.userservice);
module.exports = userservice;
