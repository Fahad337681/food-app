const express = require("express");
const router = express.Router();
const {
  createController,
  deleteCategoryController,
  updateCategoryController,
  getAllCategoryController,
} = require("../controllers/categoryController");

const authMiddleware = require("../middlewares/authMiddleware");

router.post("/create", authMiddleware, createController);
router.get("/get-all", getAllCategoryController);
router.delete("/delete/:id", deleteCategoryController);
router.put("/update/:id", authMiddleware, updateCategoryController);

module.exports = router;
