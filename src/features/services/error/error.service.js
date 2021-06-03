const NodeCache = require("node-cache");
const { config, logger } = require('@config');
const { resolveCodigo } = require('@util/commons')
const Error = require('@model/kbase/Error.model');

class ErrorService {

    constructor(cache) {
        this.cache = cache;
    }

    async findByGeneral(context, optionPage) {
        let errorPage = await Error.find({ contextos: { $in: [context] }, tipo: 'general' }).skip(optionPage).limit(3).sort({ orden: 'asc' });
        return new Promise(resolve => {
            resolve(errorPage)
        });
    }

    async findByClaveAndContext(errorCode, context) {
        errorCode = resolveCodigo(errorCode);
        let error = this.cache.get(errorCode);

        logger.debug(`error.service.findByClaveAndContext from cache (${errorCode}): ` + JSON.stringify(error));

        if (error == undefined) {
            error = await Error.findOne({ clave: errorCode, contextos: { $in: [context] } });
            if (error) {
                this.cache.set(errorCode, error);
            }
        }

        if (error && !error.contextos.includes(context)) {
            error = null;
        }

        return new Promise(resolve => {
            resolve(error)
        });
    }
}

const cache = new NodeCache({ stdTTL: config.cache.ttl, checkperiod: config.cache.checkperiod, useClones: false });
let errorService = new ErrorService(cache);

module.exports = errorService;
