const User = require('../models/UserModel'); // Mongoose model
const generateAuthToken = require('../utils/auth/generateAuthToken')
const { CustomError } = require('../utils/errors/CustomError')

exports.getAllUsers = async () => {
    const users = await User.find();
    return users;
};
exports.getUserByEmail = async (email) => {
    const user = await User.find({ email }).select('name mobileNo email address orders').populate({
        path: 'orders',
        populate: {
            path: 'foodItemsData.food',
            model: 'Food', // Replace with your food model name
        },
    });
    return user;
}
exports.loginUser = async (userData) => {
    const { email, password } = userData;
    const user = await User.findOne({ email: email });
    if (!user)
        throw new CustomError("No such user available", 400);
    if (user.password != password)
        throw new CustomError("Wrong Credentials.", 400);

    const tokenPayload = { email, isAdmin: user.isAdmin }
    const token = generateAuthToken.generateAuthToken(tokenPayload);
    return { user, token }
}
exports.registerUser = async (userData) => {
    const { name, email, password, address, mobileNo } = userData;
    const newUser = new User({ name, email, password, address, mobileNo });
    const user = await User.findOne({ email: userData.email });
    if (user)
        throw new CustomError("User is already registered", 400);
    const newDbUser = await newUser.save();

    const tokenPayload = { email, isAdmin: newDbUser.isAdmin }
    const token = generateAuthToken.generateAuthToken(tokenPayload);
    return { msg: "User registered successfully.", userData: { email, password, address, name, token, isAdmin: newDbUser.isAdmin } };
};