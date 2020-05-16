/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/
const jwt = require("jsonwebtoken");
const User = require("./../models/User");

module.exports = (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Invalid access token." });
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, decodePayload) => {
      if (err) {
        return res.status(401).json({ message: "Invalid access token." });
      }

      req.user = await User.findById(decodePayload.subject);

      next();
    });
  } catch (error) {
    next(error);
  }
};
