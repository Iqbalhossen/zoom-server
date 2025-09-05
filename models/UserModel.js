const mongoose = require("mongoose"); // Erase if already required
const bcrypt = require("bcryptjs");
// Declare the Schema of the Mongo model
let userSchema = new mongoose.Schema(
  {
    full_name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      default: "user",
    },
    password: {
      type: String,
    },
    resetPasswordToken: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

//  Hash password before save
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

//  Compare password method
userSchema.methods.matchPassword = function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

//Export the model
module.exports = mongoose.model("User", userSchema);
