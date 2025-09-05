const mongoose = require("mongoose"); // Erase if already required
// Declare the Schema of the Mongo model
let ProductImageSchema = new mongoose.Schema(
  {
    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    image: {
      type: String, 
      required: true,
    },
  },
  { timestamps: true }
);

//Export the model
module.exports = mongoose.model("ProductImage", ProductImageSchema);
