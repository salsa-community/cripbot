const NodeCache = require("node-cache");
const config = require('@config');
const Contexto = require('@model/kbase/Contexto.model')

class ContextService {

    constructor(cache) {
        this.cache = cache;
    }

    async getContext(key) {
        let context = this.cache.get(key);

        if (context == undefined) {
            context = await Contexto.findOne({ clave: key });
            this.cache.set(key, context)
        }

        return new Promise(resolve => {
            resolve(context)
        });
    }
}

const cache = new NodeCache({ stdTTL: config.cache.ttl, checkperiod: config.cache.ttl * 0.2 });
let contextService = new ContextService(cache);

module.exports = contextService;
