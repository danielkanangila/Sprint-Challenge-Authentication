const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("./../models/User");

router.post("/register", validateBody, async (req, res, next) => {
  try {
    const hash = bcrypt.hashSync(req.body.password, 10);

    const user = await User.create({
      ...req.body,
      password: hash,
    });

    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await User.query().where({ username }).first();

    if (user && bcrypt.compareSync(password, user.password)) {
      const tokenPayload = {
        subject: user.id,
        username: user.username,
      };
      const accessToken = jwt.sign(tokenPayload, process.env.JWT_SECRET);

      res.cookie("token", accessToken);

      res.json({ message: "Successful logged in." });
    } else {
      res.status(403).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    next(error);
  }
});

router.get("/logout", (req, res) => {
  if (req.cookies) {
    res.cookie("token", ""), res.json({ message: "successful logged out." });
  }
});

async function validateBody(req, res, next) {
  if (req.body && (!req.body.password || !req.body.username)) {
    return res
      .status(401)
      .json({ message: "username and password fields are required" });
  }
  if (req.body.password.length < 8) {
    return res
      .status(401)
      .json({ message: "password must have a minimum 8 characters" });
  }
  if (await User.isExists(req.body.username)) {
    return res.status(401).json({ message: "username already in use." });
  }
  next();
}

module.exports = router;
