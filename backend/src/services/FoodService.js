const Foods = require('../models/FoodModel'); // Mongoose model

exports.addFood = async (foodData) => {
    const { name, price, tags, faviroute, stars, imageUrl, origins, cookTime } = foodData;
    const newFood = new Foods({ name, price, tags, faviroute, stars, imageUrl, origins, cookTime });
    await newFood.save();
    return newFood;
};

exports.getFoods = async () => {
    const foods = await Foods.find().populate('tags');
    return foods
}

exports.getFoodsByName = async (name) => {
    const normalizedName = name.replace(/\s+/g, '').toLowerCase();
    // Use aggregation to match normalized names in the database
    const foods = await Foods.aggregate([
        {
            $addFields: {
                normalizedName: {
                    $replaceAll: {
                        input: { $toLower: { $replaceAll: { input: "$name", find: " ", replacement: "" } } },
                        find: " ",
                        replacement: ""
                    }
                }
            }
        },
        {
            $match: {
                normalizedName: { $regex: normalizedName }
            }
        }
    ]);

    return foods;
}

exports.getFoodByTags = async (tagId) => {
    const foods = await Foods.find({ tags: tagId }).populate('tags');
    return foods;
}

exports.getFoodByID = async (id) => {
    const food = await Foods.findById(id).populate('tags');
    return food;
}

exports.deleteFood = async (id) => {
    const deletedFood = await Foods.findByIdAndDelete(id);
    return deletedFood;
}

exports.updateFood = async (id, foodBody) => {
    const updatedFood = await Foods.findByIdAndUpdate(id, foodBody, { new: true });
    return updatedFood;
}
