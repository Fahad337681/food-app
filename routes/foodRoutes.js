const express = require("express");
const router = express.Router();

const { createFoodController } = require("../controllers/foodController");

const authMiddleware = require("../middlewares/authMiddleware");


router.post("/create", createFoodController);



module.exports = router;
