const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Define the User Schema
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true, // Removes trailing spaces
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true, // Always store email in lowercase
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "user"], // User can either be an admin or user
      default: "user", // Default role is user
    },
  },
  { timestamps: true }
);

// Password hashing (pre-save)
userSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next(); // Only hash if password is modified

  bcrypt
    .genSalt(10)
    .then((salt) => bcrypt.hash(this.password, salt))
    .then((hash) => {
      this.password = hash;
      next();
    })
    .catch((err) => next(err));
});

// Password comparison method for login
userSchema.methods.comparePassword = function (plainPassword) {
  return bcrypt.compare(plainPassword, this.password);
};

// Export the User model
module.exports = mongoose.model("User", userSchema);
