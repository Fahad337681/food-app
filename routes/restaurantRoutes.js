const express = require("express");
const router = express.Router();
const {createRestaurantController}=require('../controllers/restaurantController');



const authMiddleware = require("../middlewares/authMiddleware");


router.post("/create", authMiddleware, createRestaurantController);

module.exports = router;
