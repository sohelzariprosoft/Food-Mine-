const ErrorLogs = require('../models/ErrorLogs')

exports.createError = async (errorBody) => {
    try {
        const errLogs = new ErrorLogs(errorBody);
        const savedError = await errLogs.save();
        return savedError;
    } catch (error) {
        throw new Error('Some error occures in create errors.')
    }
}

exports.getAllErrors = async () => {
    try {
        const errors = await ErrorLogs.find();
        return errors
    } catch (error) {
        throw new Error('Some error occures in get errors.')
    }
}