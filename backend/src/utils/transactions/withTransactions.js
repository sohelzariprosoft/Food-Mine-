const mongoose = require('mongoose');

const withTransaction = async (serviceMethod) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const result = await serviceMethod(session);
        await session.commitTransaction();
        return result;
    } catch (error) {
        await session.abortTransaction();
        throw error; // Pass error to the global error handler
    } finally {
        session.endSession();
    }
};

module.exports = withTransaction;