const express = require("express");
const router = express.Router();

const {
  createFoodController,
  getAllFoodController,
  getSingleFoodController,
  getFoodByRestaurantController,
  updateFoodController,
  foodDeleteController,
  placeOrderController,
} = require("../controllers/foodController");

const authMiddleware = require("../middlewares/authMiddleware");

router.post("/create", createFoodController);
router.get("/get-all", getAllFoodController);
router.get("/get-single/:id", getSingleFoodController);
router.get("/getByRestaurant/:id", getFoodByRestaurantController);
router.put("/update/:id", authMiddleware, updateFoodController);
router.delete("/delete/:id", foodDeleteController);
//PLACE ORDER
router.post("/placeOrder", authMiddleware, placeOrderController);

module.exports = router;
