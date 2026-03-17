const express = require("express");
const router = express.Router();


const {
  getUserController,
  getUpdateController,
  resetPasswordController,
  updatePasswordController,
  deleteUserController,
  logoutController,
} = require("../controllers/userController");

const authMiddleware = require("../middlewares/authMiddleware");

// GET USER || GET
router.get("/getUser", authMiddleware, getUserController);

// Update Profile
router.post("/updateUser", authMiddleware, getUpdateController);

//Reset Password
router.post("/reset-password",resetPasswordController);

//update Password
router.post("/update-password",authMiddleware,updatePasswordController);

//Delete user
router.delete("/delete-user",authMiddleware,deleteUserController);

//logout
router.post("/logout",authMiddleware,logoutController)

module.exports = router;
