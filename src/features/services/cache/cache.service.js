const NodeCache = require("node-cache");
const { config, logger } = require('@config');

class CacheService {


    constructor(cache) {
        this.flowKey = 'flow-';
        this.cache = cache;
    }

    get(key) {
        let element = this.cache.get(key);
        logger.debug(`cache.get((${key})): ` + JSON.stringify(element));
        return element;
    }

    set(key, element) {
        this.cache.set(key, element);
    }

    delete(key) {
        return this.cache.del(key);
    }

    getFlows(context) {
        let key = this.flowKey + context;
        let flows = this.cache.get(key);
        logger.debug(`cache.get((${key})): ` + JSON.stringify(flows));
        return flows;
    }

    setFlows(context, flows) {
        let key = this.flowKey + context;
        this.cache.set(key, flows);
    }
}

const cache = new NodeCache({ stdTTL: config.cache.ttl, checkperiod: config.cache.checkperiod, useClones: false });
let cacheService = new CacheService(cache);

module.exports = cacheService;
