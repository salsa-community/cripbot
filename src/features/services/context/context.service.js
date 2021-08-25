const Contexto = require('@model/kbase/Contexto.model')
const CacheService = require('@service/cache/cache.service')

class ContextService {

    async getContext(key) {
        let context = CacheService.get(key);

        if (context == undefined) {
            context = await Contexto.findOne({ clave: key });
            CacheService.set(key, context)
        }

        return new Promise(resolve => {
            resolve(context)
        });
    }
}

module.exports = new ContextService();
