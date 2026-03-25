const express = require("express");
const router = express.Router();
const {
  createRestaurantController,
  getAllRestaurantController,
  getSingleRestaurantController,
  deleteRestaurantController,
} = require("../controllers/restaurantController");



const authMiddleware = require("../middlewares/authMiddleware");


router.post("/create", authMiddleware, createRestaurantController);
router.get("/get-all",getAllRestaurantController);
router.get("/get-Single/:id",getSingleRestaurantController);
router.delete("/del-res/:id",authMiddleware,deleteRestaurantController);

module.exports = router;
