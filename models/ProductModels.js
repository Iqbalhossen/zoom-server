const mongoose = require("mongoose"); // Erase if already required
// Declare the Schema of the Mongo model
let ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    categories: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    slug: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      default: null,
    },
    stock: {
      type: Boolean,
      default: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

//Export the model
module.exports = mongoose.model("Product", ProductSchema);
