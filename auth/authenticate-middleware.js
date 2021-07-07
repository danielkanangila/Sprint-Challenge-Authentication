/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/
const jwt = require("jsonwebtoken");
const User = require("./../models/User");
const RevokedToken = require("./../models/RevokedToken");

module.exports = async (req, res, next) => {
  try {
    const bearerHeader = req.headers["authorization"];

    if (!bearerHeader) {
      return res.status(403).json({ message: "Missing access token." });
    }

    const token = bearerHeader.split(" ")[1];
    req.token = token;

    const row = await RevokedToken.query().where({ token }).first();

    if (row)
      return res
        .status(403)
        .json({ message: "Access-Token is no longer valid." });

    jwt.verify(token, process.env.JWT_SECRET, async (err, decodePayload) => {
      if (err) {
        return res.status(403).json({ message: "Invalid access token." });
      }

      req.user = await User.findById(decodePayload.subject);

      next();
    });
  } catch (error) {
    next(error);
  }
};
