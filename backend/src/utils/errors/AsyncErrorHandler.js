const AsyncErrorhandler = func => (req, res, next) => {
    Promise.resolve(func(req, res, next)).catch(next);
}

module.exports = AsyncErrorhandler