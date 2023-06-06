// app/routes/authRoutes.js

const express = require("express");
const router = express.Router();
const User = require("../models/user");

// Login page
router.get("/login", (req, res) => {
  res.render("login");
});

// Login handler
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });

    // Verify user's password
    if (user && (await user.verifyPassword(password))) {
      // Create session for user
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
    // Extract name, email, and password from the request body
    const { name, email, password } = req.body;

    // Check if a user with the same email already exists
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      // If a user with the same email exists, display an error message
      res.status(400).json({ message: 'An account with this information already exists, try logging in instead' });
      return;
    }

    // Create a new user in the database
    const userData = await User.create({ name, email, password });

    // Create session variables for the signed-up user
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
