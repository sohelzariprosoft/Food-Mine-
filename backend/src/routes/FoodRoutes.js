const express = require("express");
const routeErrorWraper = require('../utils/errors/WrapAllRoutes')
const foodController = require('../controllers/FoodController')
const router = express.Router();

router.get("/", foodController.getFoods);
router.post("/addfood", foodController.addFood);
router.get('/:id', foodController.getFoodByID);
router.get('/search/:name', foodController.getFoodsByName);
router.get('/getBytags/:tag', foodController.getFoodByTags)
router.delete('/:id', foodController.deleteFood);
router.put('/:id', foodController.updateFood);

routeErrorWraper(router);
module.exports = router;