const foodModel = require("../models/foodModel");

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
      rating,
    });

    return res.status(201).send({
      success: true,
      message: "Food created Successfully",
      food,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in Food Creation API",
      error,
    });
  }
};

const getAllFoodController = async (req, res) => {
  try {
    const food = await foodModel.find({});
    if (!food) {
      return res.status(404).send({
        success: false,
        message: "No food Found",
      });
    }
    return res.status(200).send({
      success: true,
      totalCount: food.length,
      food,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in get ALL food API",
      error,
    });
  }
};

const getSingleFoodController = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(500).send({
        success: false,
        message: "Please provide Id",
      });
    }

    const food = await foodModel.findById(id);
    if (!food) {
      return res.status(404).send({
        success: false,
        message: "No food For this Id Found", // ✅ small m
      });
    }

    return res.status(200).send({
      success: true,
      food,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in get Single food API",
      error,
    });
  }
};

const getFoodByRestaurantController = async (req, res) => {
  try {
    const restaurantId = req.params.id;

    if (!restaurantId) {
      return res.status(500).send({
        success: false,
        message: "Please provide Id",
      });
    }

    const food = await foodModel.find({restaurant:restaurantId});
    if (!food) {
      return res.status(404).send({
        success: false,
        message: "No food For this Id Found", 
      });
    }

    return res.status(200).send({
      success: true,
      message:'Food bases on restaurant',
      food,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in get By restaurant Id",
      error,
    });
  }
};

module.exports = {
  createFoodController,
  getAllFoodController,
  getSingleFoodController,
  getFoodByRestaurantController,
};
