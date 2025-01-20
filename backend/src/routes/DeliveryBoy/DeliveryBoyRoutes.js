const express = require("express");
const deliveryBoyUserControllers = require('../../controllers/DeliveryBoy/DeliveryBoyController')
const deliveryBoyOrdersController = require('../../controllers/DeliveryBoy/DeliveryBoyOrderController')
const jwtDeliveryBoyAuthMiddleware = require('../../middlewares/auth/jwtDeliveryBoyAuthMiddleware')
const routeErrorWraper = require('../../utils/errors/WrapAllRoutes')
const router = express.Router();

router.post('/login', deliveryBoyUserControllers.signInUser);
router.post('/register', deliveryBoyUserControllers.registerUser);
router.get('/profile', jwtDeliveryBoyAuthMiddleware, deliveryBoyUserControllers.getUserProfile)
//for orders
router.get('/ordersByPostalCode', jwtDeliveryBoyAuthMiddleware, deliveryBoyOrdersController.getOrdersByPostalCode)
router.post('/acceptOrder', jwtDeliveryBoyAuthMiddleware, deliveryBoyOrdersController.acceptOrderByDeliveryBoy)

routeErrorWraper(router)
module.exports = router;