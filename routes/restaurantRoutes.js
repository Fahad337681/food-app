const express = require("express");
const router = express.Router();
const {
  createRestaurantController,
  getAllRestaurantController,
  getSingleRestaurantController,
} = require("../controllers/restaurantController");



const authMiddleware = require("../middlewares/authMiddleware");


router.post("/create", authMiddleware, createRestaurantController);
router.get("/get-all",getAllRestaurantController);
router.get("/get-Single/:id",getSingleRestaurantController);

module.exports = router;
