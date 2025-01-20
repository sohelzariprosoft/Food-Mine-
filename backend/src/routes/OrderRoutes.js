const express = require("express");
const routeErrorWraper = require('../utils/errors/WrapAllRoutes')
const orderController = require('../controllers/OrderController')
const jwtAuthMiddleware = require('../middlewares/auth/jwtAuthMiddleware')
const jwtAdminAuthMiddleware = require('../middlewares/auth/jwtAdminAuthMiddleware')
const router = express.Router();

router.get('/getAllOrders', jwtAdminAuthMiddleware, orderController.getOrdrs);
router.get('/getOrderById/:orderId', jwtAuthMiddleware, orderController.getOrderById);
router.get('/getOrdersByEmail/:email', jwtAuthMiddleware, orderController.getOrdersByEmail);
router.post('/createOrder', jwtAuthMiddleware, orderController.createOrder);
router.post('/cancelOrder/:orderId', jwtAuthMiddleware, orderController.cancelOrderByID);
router.post('/changeOrderStatusByIdFromDeliveryBoy/:orderId', jwtAdminAuthMiddleware, orderController.changeOrderStatusByIdFromDeliveryBoy);


routeErrorWraper(router);
module.exports = router;