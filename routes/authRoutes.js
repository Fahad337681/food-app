const express = require("express");
const router = express.Router();

// IMPORT CONTROLLER
const { registerController,loginController } = require("../controllers/authControllers");

// REGISTER ROUTE  || post
router.post("/register", registerController);

//LOGIN ||POST
router.post("/login", loginController);

module.exports = router;