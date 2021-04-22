const Context = require('@model/bot/Context.js')
var Contexto = require('@model/kbase/Contexto.model')

class ContextService {

    constructor() {

    }

    async getContext(contextKey) {
        let context = await Contexto.findOne({ clave: contextKey });
        return new Promise(resolve => {
            resolve(new Context(context))
        });
    }
}

let contextService = new ContextService();

module.exports = contextService;
