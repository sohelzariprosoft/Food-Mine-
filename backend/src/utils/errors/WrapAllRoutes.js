const AsyncErrorHandler = require('./AsyncErrorHandler')
const routeErrorWraper = (router) => {
    router.stack.forEach((layer) => {
        if (layer.route) {
            layer.route.stack.forEach((routeLayer) => {
                if (routeLayer.handle instanceof Function) {
                    routeLayer.handle = AsyncErrorHandler(routeLayer.handle);
                }
            });
        }
    });
};

module.exports = routeErrorWraper;