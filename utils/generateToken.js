const jwt = require("jsonwebtoken");

const generateToken = (res, userId) => {
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("assignment_token", token, {
    // https only
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
    // ********https only  end

    // ********local only  end
    // httpOnly: false,
    // secure: false,
    // sameSite: "strict",

    maxAge: 1 * 60 * 60 * 1000,
  });
  return token;
};

module.exports = generateToken;
