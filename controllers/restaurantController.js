//restaurant controller

const restaurantModel = require("../models/restaurantModel");

const createRestaurantController = async (req, res) => {
  try {
    const {
      title,
      imageUrl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coords,
    } = req.body;

    if (!title || !coords) {
      return res.status(500).send({
        success: false,
        message: "Please provide Title and Address",
      });
    }

    const newRestaurant = new restaurantModel({
      title,
      imageUrl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coords,
    });

    await newRestaurant.save();

    res.status(500).send({
      success: true,
      message: "Restaurant Created successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Create restaurant Api",
      error,
    });
  }
};

const getAllRestaurantController = async (req, res) => {
  try {
    const restaurants = await restaurantModel.find({});
    if (!restaurants) {
      return res.status(404).send({
        success: false,
        message: "No Restaurant Available",
      });
    }

    return res.status(200).send({
      success: true,
      totalCount: restaurants.length,
      restaurants,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in get all restaurant Api",
      error,
    });
  }
};

const getSingleRestaurantController = async (req, res) => {
  try {
    const restaurantId = req.params.id;

    const restaurant = await restaurantModel.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).send({
        success: false,
        message: "NO restaurant found",
      });
    }

    return res.status(200).send({
      success: true,
      restaurant,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in get Single Restaurant API",
      error,
    });
  }
};

const deleteRestaurantController=async(req,res)=>{
  try {

    const Id=req.params.id;
    const restaurant=await restaurantModel.findByIdAndDelete(Id)

    if(!restaurant){
      return res.status(404).send({
        success:false,

        message:'No restaurant Found'
      })
    }

    return res.status(200).send({
      success:true,
      message:'restaurant Deleted Successfully'
    })
    
  } catch (error) {
    console.log(error)
    return res.status(500).send({
      success:false,
      message:'Error in Delete restaurant API',
      error
    })
  }
};

module.exports = {
  createRestaurantController,
  getAllRestaurantController,
  getSingleRestaurantController,
  deleteRestaurantController,
};
