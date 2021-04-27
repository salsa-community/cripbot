const User = require('@model/bot/User.js')
const { Usuario } = require('@model/vtiger')

class VtigerUserService {

    constructor() {

    }

    async findByUsername(username) {
        let usuario = await Usuario.findOne({ where: { siccode: username }, attributes: ['siccode', 'accountname'] });
        return new Promise(resolve => {
            if (usuario) {
                resolve(new User(usuario.siccode, usuario.accountname))
            } else {
                resolve(undefined);
            }
        });
    }
}

module.exports = VtigerUserService;
