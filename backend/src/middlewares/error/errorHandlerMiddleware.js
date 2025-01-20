const errorService = require('../../services/errorService')

module.exports = async (error, req, res, next) => {

    try {
        error.statusCode = error.statusCode || 500;
        error.status = error.status || "error";
        const errorBody = { status: error.status, message: error.message, stack: error.stack }
        const savedError = await errorService.createError(errorBody);
        if (savedError) {
            return res.status(error.statusCode).json({
                success: false,
                status: error.status,
                message: error.message,
                stack: error.stack,
            });
        } else {
            return res.status(error.statusCode).json({
                success: false,
                message: 'Some error occured while saving error logs'
            })
        }
    } catch (error) {
        return res.status(error.statusCode).json({
            success: false,
            message: 'Some error occured while saving error logs'
        })
    }

};
