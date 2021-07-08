const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema(
  {
    _id: String,
    title: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
      text: true,
    },

    price: {
      type: Number,
      required: true,
      trim: true,
      maxlength: 32,
    },
    images: {
      type: Array,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
