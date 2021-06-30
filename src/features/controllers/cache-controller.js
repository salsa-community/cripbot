/**
 * Cache service
 */

const CacheService = require('@service/cache/cache.service')
const { config, logger } = require('@config');

module.exports = function (controller) {


    controller.webserver.get('/cache/update', (req, res) => {
        res.setHeader('content-type', 'application/javascript');
        let result = { key: req.query.key, count: 0 };
        result.count = CacheService.delete(result.key);
        logger.info(`cache.delete((${result.key})): ${result.count}`);
        res.send(JSON.stringify(result));
    });
}
