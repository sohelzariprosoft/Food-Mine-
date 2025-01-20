const express = require("express");
const cors = require('cors');
const morgan = require("morgan");
const errorHandlerMiddleware = require('./middlewares/error/errorHandlerMiddleware')
const dbConnection = require('./configs/Database')
const userRoutes = require("./routes/UserRoutes")
const foodRoutes = require("./routes/FoodRoutes")
const tagRoutes = require("./routes/TagRoutes")
const orderRoutes = require("./routes/OrderRoutes")
const paymentRoutes = require("./routes/PaymentRoutes");
const deliveryBoyUserRoutes = require('./routes/DeliveryBoy/DeliveryBoyRoutes')
const { CustomError } = require('./utils/errors/CustomError')
const app = express();

//#region Middlewares
require("dotenv").config();
app.use(morgan('dev'));
app.use(express.json())
app.use(cors({ credentials: true, origin: ["http://localhost:4200", "http://localhost:8100"] }))
//#endregion

//#region Db Configs
dbConnection();
//#endregion

//#region routes
app.use("/users", userRoutes); // Prefix all user routes with '/users'
app.use("/foods", foodRoutes);
app.use("/tags", tagRoutes);
app.use("/orders", orderRoutes);
app.use("/payment", paymentRoutes);
app.use("/deliveryBoy", deliveryBoyUserRoutes)
// app.use("/deliveryBoyOrders")
//#endregion

//#region Erorr Handler Middlewares
app.all('*', (req, res, next) => {
    const err = new CustomError('Cant find this route', 404);
    next(err)
})
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection:', reason);
});
app.use(errorHandlerMiddleware);  //Use as last middleware for getting work properly
//#endregion

module.exports = app; // Export the configured app