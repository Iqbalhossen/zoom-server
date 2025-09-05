const mongoose = require("mongoose"); // Erase if already required
// Declare the Schema of the Mongo model
let CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    
  },
  { timestamps: true }
);


//Export the model
module.exports = mongoose.model("Category", CategorySchema);
