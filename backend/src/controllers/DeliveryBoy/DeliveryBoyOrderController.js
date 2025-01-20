const deliveryBoyOrderService = require('../../services/DeliveryBoy/DeliveryBoyOrderService')
const deliveryBoyUserService = require('../../services/DeliveryBoy/DeliveryBoyService')

exports.getOrdersByPostalCode = async (req, res) => {
    tokenUserEmail = req.user.email
    const deliveryBoy = await deliveryBoyUserService.getDeliveryBoyFromEmail(tokenUserEmail)
    const ordersByPostalCode = await deliveryBoyOrderService.getOrdersByPostalCodeForDeliveryBoy(deliveryBoy.workAreaPostalCode);
    return res.status(200).json({ success: true, ordersByPostalCode })
}

exports.acceptOrderByDeliveryBoy = async (req, res) => {
    const { orderId, userId } = req.body;
    const acceptDelivery = await deliveryBoyOrderService.AcceptOrderByDeliveryBoy(userId, orderId);
    return res.status(200).json({ success: true, acceptDelivery })
}