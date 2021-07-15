const { resolveCodigo } = require('@util/commons')
const Error = require('@model/kbase/Error.model');
const CacheService = require('@service/cache/cache.service')
class ErrorService {

    async findByGeneral(context, optionPage) {
        let errorPage = await Error.find({ contextos: { $in: [context] }, tipo: 'general' }).skip(optionPage).limit(8).sort({ orden: 'asc' });
        return new Promise(resolve => {
            resolve(errorPage)
        });
    }

    async findByClaveAndContext(errorCode, context) {
        let error = CacheService.get(errorCode);

        if (error == undefined) {
            error = await Error.findOne({ clave: errorCode });
            if (error) {
                CacheService.set(errorCode, error);
            }
        }

        if (error && !error.contextos.includes(context)) {
            error = null;
        }

        return new Promise(resolve => {
            resolve(error)
        });
    }


    async findAllFlows(context) {
        let flows = CacheService.getFlows(context);

        if (flows == undefined) {
            flows = await Error.find({ contextos: { $in: [context] } }, 'clave hears');
            if (flows) {
                CacheService.setFlows(context, flows);
            }
        }

        return new Promise(resolve => {
            resolve(flows)
        });
    }
}

module.exports = new ErrorService();
