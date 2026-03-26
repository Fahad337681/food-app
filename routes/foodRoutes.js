const express = require("express");
const router = express.Router();

const {
  createFoodController,
  getAllFoodController,
  getSingleFoodController,
  getFoodByRestaurantController,
} = require("../controllers/foodController");


const authMiddleware = require("../middlewares/authMiddleware");


router.post("/create", createFoodController);
router.get("/get-all",getAllFoodController);
router.get("/get-single/:id", getSingleFoodController);
router.get("/getByRestaurant/:id", getFoodByRestaurantController);


module.exports = router;
