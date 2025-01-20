const userService = require("../services/UserService");
const scheduleEmail = require('../utils/messaging/GenerateReminderMail')

exports.registerUser = async (req, res) => {
    const newUser = await userService.registerUser(req.body);
    scheduleEmail();
    res.status(201).json({ success: true, data: newUser });
};
exports.signInUser = async (req, res) => {
    const loginUser = await userService.loginUser(req.body);
    res.status(200).json({ success: true, data: loginUser });
}
exports.getAllUsers = async (req, res) => {
    const users = await userService.getAllUsers();
    res.status(200).json({ success: true, data: users })
}
exports.getUserByEmail = async (req, res) => {

    if (req.user === req.params.email) {
        const user = await userService.getUserByEmail(req.params.email);
        return res.status(200).json({ success: true, user });
    }
    return res.status(403).json({ success: false, message: "You are not authorized to view this user profile" })
}

