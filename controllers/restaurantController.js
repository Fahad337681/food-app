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

   if(!title || !coords){
    return res.status(500).send({
        success:false,
        message:'Please provide Title and Address'
    })
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
        success:true,
        message:'Restaurant Created successfully'
    })

  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Create restaurant Api",
      error,
    });
  }
};

module.exports = { createRestaurantController };
