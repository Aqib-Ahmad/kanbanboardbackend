const jwt = require("jsonwebtoken");
const User = require("../Model/User");
const cookieParser = require("cookie-parser");

const userAuth = async (req, res, next) => {
  console.log(req.cookies);
  try {
    const cookies = req.cookies;
    const { token } = cookies;
    if (!token) {
      throw new Error("You are not authenticated");
    }
    const decodedToken = await jwt.verify(token, "secret key");
    const { _id } = decodedToken;
    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User not found");
    }
    req.user = user;
    next();
  } catch (err) {
    console.error("Authentication error:", err);
    return res.status(401).json({ error: err.message });
  }
};
module.exports = {
  userAuth,
};
