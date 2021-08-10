const NodeCache = require("node-cache");
const { config, logger } = require('@config');

class CacheService {

    static flowKey;
    static generalKey;

    constructor(cache) {
        this.flowKey = 'flow';
        this.generalKey = 'general';
        this.cache = cache;
    }

    get(key) {
        if (key) {
            let element = this.cache.get(key);
            logger.debug(`cache.get((${key})): ` + JSON.stringify(element));
            return element;
        } else return undefined;
    }

    set(key, element) {
        this.cache.set(key, element);
    }

    delete(key) {
        return this.cache.del(key);
    }

    getGeneralDialogs(context) {
        this.get(this.generalKey + context);
    }

    setGeneralDialogs(context, dialogs) {
        this.set(this.generalKey + context, dialogs);
    }

    getFlows(context) {
        return this.get(this.flowKey + context);
    }

    setFlows(context, flows) {
        this.set(this.flowKey + context, flows);
    }

    flushAll() {
        this.cache.flushAll();
    }

    getStats() {
        return this.cache.getStats();
    }
}

const cache = new NodeCache({ stdTTL: config.cache.ttl, checkperiod: config.cache.checkperiod, useClones: false });
let cacheService = new CacheService(cache);

module.exports = cacheService;
