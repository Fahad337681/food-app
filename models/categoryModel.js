const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Category Title is required"],
    },
    imageUrl: {
      type: String,
      default: "https://share.google/PV7LAE6yOyuydjs1x",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("category", categorySchema);
