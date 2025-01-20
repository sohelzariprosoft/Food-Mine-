const foodService = require("../services/FoodService");

exports.addFood = async (req, res) => {
    const newFood = await foodService.addFood(req.body);
    res.status(201).json({ success: true, newFood });
}

exports.getFoods = async (req, res) => {
    const foods = await foodService.getFoods();
    res.status(200).json({ success: true, foods });
}

exports.getFoodsByName = async (req, res) => {
    const foods = await foodService.getFoodsByName(req.params.name);
    res.status(200).json({ success: true, foods });
}

exports.getFoodByTags = async (req, res) => {
    const foods = await foodService.getFoodByTags(req.params.tag);
    res.status(200).json({ success: true, foods });
}

exports.getFoodByID = async (req, res) => {
    const food = await foodService.getFoodByID(req.params.id);
    res.status(200).json({ success: true, food });
}

exports.updateFood = async (req, res) => {
    const food = foodService.updateFood(req.params.id, req.body);
    res.status(200).json({ success: true, food })
}

exports.deleteFood = async (req, res) => {
    const food = await foodService.deleteFood(req.params.id);
    res.status(204).json({ success: true, message: "Food deleted successfully." })
}