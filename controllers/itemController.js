const Item = require("../models/itemModel");

// Create a new item (admin only)
exports.createItem = (req, res) => {
  const { name, description, price, stock } = req.body;

  const newItem = new Item({ name, description, price, stock });

  newItem
    .save()
    .then((item) => res.status(201).json({ message: "Item created", item }))
    .catch((err) =>
      res.status(400).json({ message: "Error creating item", error: err })
    );
};

// View all items
exports.viewAllItems = (req, res) => {
  Item.find()
    .then((items) => res.json(items))
    .catch((err) =>
      res.status(500).json({ message: "Error fetching items", error: err })
    );
};

// View one item
exports.viewOneItem = (req, res) => {
  Item.findOne({ _id: req.params.itemId })
    .then((item) => {
      if (!item) {
        return res.status(404).json({ message: "Item not found" });
      }
      res.json({ message: "Item found", item });
    })
    .catch((err) =>
      res.status(500).json({ message: "Error fetching item", error: err })
    );
};

// Update an item (admin only)
exports.updateItem = (req, res) => {
  const { itemId } = req.params;
  const updates = req.body;

  Item.findByIdAndUpdate(itemId, updates, { new: true })
    .then((updatedItem) =>
      res.json({ message: "Item updated", item: updatedItem })
    )
    .catch((err) =>
      res.status(400).json({ message: "Error updating item", error: err })
    );
};

// Delete an item (admin only)
exports.deleteItem = (req, res) => {
  const { itemId } = req.params;

  Item.findByIdAndDelete(itemId)
    .then(() => res.json({ message: "Item deleted" }))
    .catch((err) =>
      res.status(400).json({ message: "Error deleting item", error: err })
    );
};

// Like an item (authenticated users only)
exports.likeItem = (req, res) => {
  const { itemId } = req.params;

  Item.findByIdAndUpdate(itemId, { $inc: { likes: 1 } }, { new: true })
    .then((item) => res.json({ message: "Item liked", item }))
    .catch((err) =>
      res.status(400).json({ message: "Error liking item", error: err })
    );
};

// Dislike an item (authenticated users only)
exports.dislikeItem = (req, res) => {
  const { itemId } = req.params;

  Item.findByIdAndUpdate(itemId, { $inc: { dislikes: 1 } }, { new: true })
    .then((item) => res.json({ message: "Item disliked", item }))
    .catch((err) =>
      res.status(400).json({ message: "Error disliking item", error: err })
    );
};
