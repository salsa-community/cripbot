/**
 * Cache service
 */

const CacheService = require('@service/cache/cache.service')
const { config, logger } = require('@config');

module.exports = function (controller) {

    controller.webserver.put('/api/cache/flush', (req, res) => {

        let status = {};
        let request = { clave: req.body.clave, type: req.body.type, updated: 0 };

        if (request.type == 'all') {
            CacheService.flushAll();
            request.updated = 'all';
            logger.debug(`cache.flushAll(): ${request.type}`);

        } else if (request.type == 'dialog') {
            request.updated = CacheService.delete(request.clave);
            logger.debug(`cache.flushDialog(${request.clave}): ${request.updated}`);


        } else if (request.type == 'flow' || request.type == 'general') {
            result.updated = CacheService.delete(request.type + request.clave);
            logger.info(`cache.delete((${request.type + request.clave})): ${result.updated}`);

        }

        status = CacheService.getStats();
        status = { ...request, ...status };
        res.setHeader('content-type', 'application/json');
        res.send(JSON.stringify(status));

    });
}
