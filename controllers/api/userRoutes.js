const router = require('express').Router();
const { User } = require('../../models');

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user who matches the posted email address
    const userData = await User.findOne({ where: { email } });

    if (!userData) {
      // If the user doesn't exist, display an error message
      res.status(400).json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    // Verify the posted password with the password stored in the database
    const validPassword = await userData.checkPassword(password);

    if (!validPassword) {
      // If the password is incorrect, display an error message
      res.status(400).json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    // Create session variables based on the logged-in user
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      res.json({ user: userData, message: 'You are now logged in!' });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/signup', async (req, res) => {
  try {
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

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    // Remove the session variables
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
