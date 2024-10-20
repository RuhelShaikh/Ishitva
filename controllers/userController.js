// controllers/userController.js
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register new user
exports.register = (req, res) => {
  const { username, email, password, role } = req.body;

  // Create new user
  const newUser = new User({ username, email, password, role });

  newUser
    .save()
    .then((user) => res.status(201).json({ message: "User registered", user }))
    .catch((err) =>
      res.status(400).json({ message: "Error registering user", error: err })
    );
};

// Login user
exports.login = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (!user)
        return res.status(400).json({ message: "Invalid credentials" });

      // Compare password
      user.comparePassword(password).then((isMatch) => {
        if (!isMatch)
          return res.status(400).json({ message: "Invalid credentials" });

        // Create JWT token
        const token = jwt.sign(
          { id: user._id, role: user.role },
          process.env.JWT_SECRET,
          { expiresIn: "1h" }
        );

        res.json({ token });
      });
    })
    .catch((err) =>
      res.status(500).json({ message: "Server error", error: err })
    );
};
