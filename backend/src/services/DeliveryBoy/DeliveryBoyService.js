const DeliveryBoy = require('../../models/DeliveryBoy/DeliveryBoyUserModel');
const { CustomError } = require('../../utils/errors/CustomError')
const generateDeliveryBoyAuthToken = require('../../utils/auth/generateDeliveryBoyAuthToken')
exports.loginUser = async (userData) => {
    const { email, password } = userData;
    const user = await DeliveryBoy.findOne({ email: email });
    if (!user)
        throw new CustomError("No such user available", 400);
    if (user.password != password)
        throw new CustomError("Wrong Credentials.", 400);

    const tokenPayload = { email, isDeliveryBoy: user.isDeliveryBoy, isAuthenticated: user.isAuthenticated }
    const token = generateDeliveryBoyAuthToken.generateDeliveryBoyAuthToken(tokenPayload);
    return { user, token, msg: 'Login successfully' }
}

exports.registerUser = async (userData) => {
    const { name, email, password, address, phone, city, state, workAreaPostalCode } = userData;
    const newUser = new DeliveryBoy({ ...userData });
    const user = await DeliveryBoy.findOne({ email: userData.email });
    if (user) {
        throw new CustomError("User is already registered", 400);
    }
    const newDbUser = await newUser.save();

    const tokenPayload = { email: newDbUser.email, isDeliveryBoy: newDbUser.isDeliveryBoy, isAuthenticated: newDbUser.isAuthenticated }
    const token = generateDeliveryBoyAuthToken.generateDeliveryBoyAuthToken(tokenPayload);
    return { msg: "User registered successfully.", newDbUser, token };
};

exports.getAllDeliveryBoys = async () => {
    const deliveryBoys = await DeliveryBoy.find();
    return deliveryBoys;
}

exports.getDeliveryBoyById = async (deliveryBoyId) => {
    return await DeliveryBoy.findById(deliveryBoyId);
}

exports.getDeliveryBoyFromEmail = async (email) => {
    return await DeliveryBoy.findOne({ email });
}

exports.updateDeliveriesOfDeliveryBoy = async (deliveryBoyId, orderId) => {
    const deliveryBoy = await DeliveryBoy.findByIdAndUpdate(deliveryBoyId, { $push: { deliveryHistory: { orderId } } }, { new: true });
    return deliveryBoy;
}

