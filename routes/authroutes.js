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

module.exports = router;
