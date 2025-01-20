const express = require('express');
const paymentController = require('../controllers/PaymentController');
const authMiddleware = require('../middlewares/auth/jwtAuthMiddleware');
const authAdminMiddleware = require('../middlewares/auth/jwtAdminAuthMiddleware');
const routeErrorWraper = require('../utils/errors/WrapAllRoutes');

const router = express.Router();

router.get('/', authAdminMiddleware, paymentController.getAllPayments);
router.post('/pay', authMiddleware, paymentController.payForOrder);
router.post('/verifySignature/:orderID', authMiddleware, paymentController.verifyPayment);

routeErrorWraper(router);
module.exports = router;    // Export the router