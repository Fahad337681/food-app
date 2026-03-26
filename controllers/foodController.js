const foodModel=require('../models/foodModel')
const createFoodController = async (req, res) => {
  try {
    const {
      title,
      imageUrl,
      foodDescription,
      foodTags,
      code,
      rating,
      price,
      category,
      isAvailable,
      restaurant,
    } = req.body;
    if (!title || !price) {
      return res.status(404).send({
        success: false,
        message: "Please provide All fields",
      });
    }

    const food = await foodModel.create({
      title,
      imageUrl,
      foodDescription,
      price,
      category,
      isAvailable,
      restaurant,
      foodTags,
      code,
      rating
    });
    return res.status(200).send({
      success: true,
      message: "Food created Successfully",
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in Food Creation API",
      error,
    });
  }
};

module.exports = { createFoodController };
