const express = require("express");
const router = express.Router();
const { authenticate, authorizeAdmin } = require("../auth/authMiddleware");
const itemController = require("../controllers/itemController");

// Create a new item (admin only)
router.post("/items", authenticate, authorizeAdmin, itemController.createItem);

// Update an item (admin only)
router.put(
  "/items/:itemId",
  authenticate,
  authorizeAdmin,
  itemController.updateItem
);

// Delete an item (admin only)
router.delete(
  "/items/:itemId",
  authenticate,
  authorizeAdmin,
  itemController.deleteItem
);

module.exports = router;
