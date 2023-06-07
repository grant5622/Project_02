
const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await user.verifyPassword(password))) {
      req.session.userId = user._id;
      res.redirect("/dashboard");
    } else {
      res.render("login", { error: "Invalid email or password" });
    }
  } catch (err) {
    console.error(err);
    res.render("login", { error: "An error occurred" });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      res.status(400).json({ message: 'An account with this information already exists, try logging in instead' });
      return;
    }

    const userData = await User.create({ name, email, password });

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      res.json({ user: userData, message: 'You are now signed up and logged in!' });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
