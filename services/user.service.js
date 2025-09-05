const jwt = require("jsonwebtoken");

const generateToken = (res, userId) => {
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  res.cookie("assignment_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    // httpOnly: false, // local
    // secure: false,
    sameSite: "strict",
    maxAge: 1 * 60 * 60 * 1000,
  });
  return token;
};

const generateTokenForgotPassword = (userId, email) => {
  const token = jwt.sign({ id: userId, email: email }, process.env.JWT_SECRET, {
    expiresIn: "15m",
  });
  return token;
};

const jwtTokenDecoded = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    // console.log("JWT Error:", error.message);
    //  return res.status(400).json({
    //       success: false,
    //       errors: { message: "expired token" },
    //     });

    return false;
  }
};

module.exports = {
  generateToken,
  generateTokenForgotPassword,
  jwtTokenDecoded,
};
