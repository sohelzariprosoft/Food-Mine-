const express = require("express");
const routeErrorWraper = require('../utils/errors/WrapAllRoutes')
const router = express.Router();
const userController = require("../controllers/UserController");
const jwtAuthMiddleware = require('../middlewares/auth/jwtAuthMiddleware')

router.get("/", userController.getAllUsers);
router.post("/signUp", userController.registerUser);
router.post("/signIn", userController.signInUser);
router.get("/:email", jwtAuthMiddleware, userController.getUserByEmail);

routeErrorWraper(router);
module.exports = router;