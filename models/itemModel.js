const mongoose = require("mongoose");

// Define the Item Schema
const itemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true, // Removes extra spaces
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: [0, "Price must be a positive number"], // Ensure price is positive
    },
    stock: {
      type: Number,
      required: true,
      min: [0, "Stock must be a positive number"], // Ensure stock is positive
    },
    likes: {
      type: Number,
      default: 0, // Default likes count is 0
    },
    dislikes: {
      type: Number,
      default: 0, // Default dislikes count is 0
    },
  },
  { timestamps: true }
);

// Export the Item model
module.exports = mongoose.model("Item", itemSchema);
