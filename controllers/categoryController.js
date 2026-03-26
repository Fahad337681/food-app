const { request } = require("http");
const categoryModel = require("../models/categoryModel");

const createController = async (req, res) => {
  try {
    const { title, imageUrl } = req.body;
    if (!title || !imageUrl) {
      return res.status(500).send({
        success: false,
        message: "Please Provide All fields",
      });
    }

    const category = await categoryModel.create({ title, imageUrl });

    return res.status(200).send({
      success: true,
      message: "Category created Successfully",
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in Create Category API",
      error,
    });
  }
};
const getAllCategoryController = async (req, res) => {
  try {
    const categories = await categoryModel.find({});
    if (!categories) {
      return res.status(404).send({
        success: false,
        message: "No Categories Found",
      });
    }
    return res.status(200).send({
      success: true,
      totalCategories: categories.length,
      categories,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in Get All Category API",
      error,
    });
  }
};

const deleteCategoryController = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) { 
      return res.status(500).send({
        success: false,
        message: "Please Provide category ID",
      });
    }
    const category = await categoryModel.findByIdAndDelete(id);
    if (!category) {
      return res.status(404).send({
        success: false,
        message: "No category Found",
      });
    }
    return res.status(200).send({
      success: "true",
      message: "Category Deleted Successfully",
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error  in delete Controller API",
      error,
    });
  }
};

const updateCategoryController = async (req, res) => {
  try {
    const id = req.params.id;
    const updateData = req.body;
    const category = await categoryModel.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    if (!category) {
      return res.status(404).send({
        success: false,
        message: "No Category Found",
      });
    }
    return res.status(200).send({
      success: true,
      message: "Category Updated Successfully",
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in category Update API",
      error,
    });
  }
};

module.exports = {
  createController,
  deleteCategoryController,
  updateCategoryController,
  getAllCategoryController,
};
