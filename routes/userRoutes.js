const express = require("express");
const router = express.Router();
const { authenticate } = require("../auth/authMiddleware");
const userController = require("../controllers/userController");
const itemController = require("../controllers/itemController");

// Register a new user
router.post("/register", userController.register);

// Login
router.post("/login", userController.login);

// View all items (accessible to all authenticated users)
router.get("/items", authenticate, itemController.viewAllItems);

// View one item (accessible to all authenticated users)
router.get("/items/:itemId", authenticate, itemController.viewOneItem);

// Like an item (authenticated users only)
router.post("/items/:itemId/like", authenticate, itemController.likeItem);

// Dislike an item (authenticated users only)
router.post("/items/:itemId/dislike", authenticate, itemController.dislikeItem);

module.exports = router;
