
const VtigerUserService = require('@service/user/vtiger-user.service')
const DefaultUserService = require('@service/user/default-user.service')

const config = require('@config');

let userservice = null;

if (config.bot.app.userservice == 'default') {
    userservice = new VtigerUserService();
} else {
    userservice = new DefaultUserService();
}

module.exports = userservice;
