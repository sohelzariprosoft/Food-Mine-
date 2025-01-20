const deliveryBoyUserService = require('../../services/DeliveryBoy/DeliveryBoyService');

exports.registerUser = async (req, res) => {
    const newUser = await deliveryBoyUserService.registerUser(req.body);
    return res.status(201).json({ success: true, newUser })
}

exports.signInUser = async (req, res) => {
    console.log('object');
    const loginUser = await deliveryBoyUserService.loginUser(req.body);
    console.log(loginUser);
    res.status(200).json({ success: true, loginUser });
}

exports.getUserProfile = async (req, res) => {
    const tokenUserEmail = req.user.email;
    const deliveryBoy = deliveryBoyUserService.getDeliveryBoyFromEmail(tokenUserEmail)
    return res.status(200).json({ success: true, deliveryBoy })
}