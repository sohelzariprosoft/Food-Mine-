const orderService = require('../services/OrderService');
const userService = require('../services/UserService');

exports.getOrdrs = async (req, res) => {
    const orders = await orderService.getAllOrders();
    res.status(200).json({ success: true, orders });
}

exports.createOrder = async (req, res) => {
    const orderData = req.body;
    const newOrder = await orderService.createOrder(orderData)
    res.status(201).json({ success: true, newOrder });
}
exports.getOrdersByEmail = async (req, res) => {
    if (req.user === req.params.email) {
        const user = await userService.getUserByEmail(req.params.email);
        return res.status(200).json({ success: true, orders: user[0].orders });
    }
    return res.status(403).json({ success: false, message: "You are not authorized to view this user's orders." })
}
exports.getOrderById = async (req, res) => {
    const order = await orderService.getOrderById(req.params.orderId);
    res.status(200).json({ success: true, order });
}

exports.changeOrderStatusByIdFromDeliveryBoy = async (req, res) => {
    const order = await orderService.changeOrderStatusByIdFromDeliveryBoy(req.params.orderId, 'COD Received');
    return res.status(200).json({ success: true, order });
}

exports.cancelOrderByID = async (req, res) => {
    const order = await orderService.cancelOrderById(req.params.orderId);
    return res.status(200).json({ success: true, message: "Order cancelled.", order });
}