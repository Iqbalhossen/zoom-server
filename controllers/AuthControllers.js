const UserModels = require("../models/UserModel");
const { ObjectId } = require("mongodb");

const sharp = require("sharp");
const fs = require("fs");
const {
  generateToken,
  generateTokenForgotPassword,
  jwtTokenDecoded,
} = require("../services/user.service");
const { sendForgotPasswordEmail } = require("../utils/email.validator");

const UserLogin = async (req, res) => {
  try {
    const data = req.body;
    const UserData = await UserModels.findOne({ email: data.email });
    if (!UserData) {
      return res.status(400).json({
        success: false,
        errors: { message: "Invalid  email" },
      });
    } else {
      if (!(await UserData.matchPassword(data?.password))) {
        return res.status(400).json({
          success: false,
          errors: { message: "Invalid  password" },
        });
      } else {
        const token = generateToken(res, UserData._id);
        res.status(200).json({
          success: true,
          message: "Login successful",
          data: {
            id: UserData._id,
            name: UserData.full_name,
            email: UserData.email,
          },
          token,
          role: UserData.role,
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

const UserSignup = async (req, res) => {
  try {
    const { full_name, email, password } = req.body;
    if (!req.file)
      return res.status(400).json({
        success: false,
        errors: { message: "Photo field is require" },
      });
    const exist = await UserModels.findOne({ email });
    if (exist)
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });

    fs.access("./public/", (err) => {
      if (err) {
        fs.mkdirSync("./public/");
      }
    });
    const formatedName = req.file.originalname.split(" ").join("-");
    const fileName = `${Date.now()}-${formatedName}`;
    await sharp(req.file.buffer)
      .resize(400, 400, { kernel: sharp.kernel.nearest })
      .toFile(`./public/${fileName}`);

    const storeData = {
      full_name,
      email,
      password,
      image: `public/${fileName}`,
    };

    const user = await UserModels.create(storeData);

    const token = generateToken(res, user._id);
    res.status(201).json({
      success: true,
      message: "Registration successful",
      data: { id: user._id, name: user.full_name, email: user.email },
      token,
    });
  } catch (error) {
    console.log(error);
  }
};

const UserLogout = async (req, res) => {
  try {
    res.cookie("assignment_token", "", {
      httpOnly: true,
      expires: new Date(0),
    });

    res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    console.log(error);
  }
};

const UserView = async (req, res) => {
  try {
    const data = await UserModels.find();
    res.status(201).json({
      success: true,
      message: "user data",
      data,
    });
  } catch (error) {
    console.log(error);
  }
};

const UserForgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await UserModels.findOne({ email });

    if (!user)
      return res.status(404).json({
        success: false,
        errors: { message: "User not found" },
      });

    const token = generateTokenForgotPassword(user._id, email);
    sendForgotPasswordEmail(email, token);

    user.resetPasswordToken = token;
    await user.save();

    res
      .status(200)
      .json({ success: true, message: "Password reset link sent to email" });
  } catch (error) {
    console.log(error);
  }
};

const UserForgotPasswordTokenVerify = async (req, res) => {
  const { token } = req.query;
  try {
    const DecodedToken = jwtTokenDecoded(token);
    const query = { _id: new ObjectId(DecodedToken?.id) };
    const user = await UserModels.findById(query);
    if (!user)
      return res.status(404).json({ success: false, message: "expired token" });
    res
      .status(200)
      .json({ success: true, message: "token verify", data: user });
  } catch (err) {
    res.status(400).json({ message: "Invalid or expired token" });
  }
};

const UserResetPassword = async (req, res) => {
  const { email, password, token } = req.body;
  try {
    const DecodedToken = jwtTokenDecoded(token);
    if (email !== DecodedToken?.email) {
      return res.status(404).json({
        success: false,
        errors: { message: "Invalid email" },
      });
    }

    const query = { _id: new ObjectId(DecodedToken?.id) };
    const user = await UserModels.findById(query);
    if (!user || !user?.resetPasswordToken)
      return res.status(404).json({
        success: false,
        errors: { message: "expired token" },
      });

    user.password = password;
    user.resetPasswordToken = null;
    await user.save();
    res.status(201).json({
      success: true,
      message: "Password reset successfully",
      data: user,
    });
  } catch (error) {
    console.log(error);
  }
};

const SingleUserView = async (req, res) => {
  try {
  const id  = req.params.id;
    const query = { _id: new ObjectId(id) };
    const user = await UserModels.findById(query);
    res.status(201).json({
      success: true,
      message: "Single User",
      data: user,
    });
  } catch (err) {
   console.log(err);
  }
};

module.exports = {
  UserLogin,
  UserSignup,
  UserLogout,
  UserView,
  UserForgotPassword,
  UserForgotPasswordTokenVerify,
  UserResetPassword,
  SingleUserView
};
