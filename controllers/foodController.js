const orderModel = require("../models/orderModel");
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
        message: "No food For this Id Found",
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

    const food = await foodModel.find({ restaurant: restaurantId });
    if (!food) {
      return res.status(404).send({
        success: false,
        message: "No food For this Id Found",
      });
    }

    return res.status(200).send({
      success: true,
      message: "Food bases on restaurant",
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
const updateFoodController = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    if (!id) {
      return res.status(500).send({
        success: false,
        message: "Please provide Id",
      });
    }
    const food = await foodModel.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    return res.status(200).send({
      success: true,
      food,
    });
  } catch (error) {
    console.log(error);
    return res.status(200).send({
      success: false,
      message: "Error in Food Update API",
    });
  }
};

const foodDeleteController = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(400).send({
        success: false,
        message: "Please provide a valid Food ID",
      });
    }

    const deletedFood = await foodModel.findByIdAndDelete(id);

    if (!deletedFood) {
      return res.status(404).send({
        success: false,
        message: "Food item not found in database!",
      });
    }

    return res.status(200).send({
      success: true,
      message: "Food item deleted successfully from DB",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Food Delete API",
      error: error.message,
    });
  }
};

const placeOrderController = async (req, res) => {
  try {
    const { cart, payment } = req.body;
    if (!cart || !payment) {
      return res.status(500).send({
        success: false,
        message: "please food cart or payment method",
      });
    }

    let total = 0;
    cart.map((i) => {
      total += i.price;
    });

    const newOrder = new orderModel({
      foods: cart,
      payment:payment,
      buyer: req.userId,
    });

    res.status(201).send({
      success: true,
      message: "Order Placed successfully",
      newOrder,
    });
    await newOrder.save();
  } catch (error) {
    console.log(error)
      return res.status(500).send({
        success:false,
        message:'Error in Place order API',
        error
      })
    }
  };
module.exports = {
  createFoodController,
  getAllFoodController,
  getSingleFoodController,
  getFoodByRestaurantController,
  updateFoodController,
  foodDeleteController,
  placeOrderController,
};
