const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Food title is required"],
    },
    imageUrl: {
      type: String,
      default: "https://share.google/BE6Tmp58T6e5SC2V0",
    },
    foodDescription: {
      type: String,
    },
    price: {
      type: Number,
      required: [true, "Food price is required"],
    },
    foodTags: {
      type: Array,
    },
    code: {
      type: String,
    },
    rating: {
      type: Number,
      default: 1,
      min: 1,
      max: 5,
    },
    category: {
      type: String,
    },
    isAvailable: {
      type: Boolean,
    },
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("food", foodSchema);
