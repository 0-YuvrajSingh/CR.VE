import foodModel from "../models/foodModels.js";
import fs from "fs";

// Add Food Item
const addFood = async (req, res) => {
  try {
    const image_filename = req.file ? req.file.filename : null;

    const food = new foodModel({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      image: image_filename,
    });

    await food.save();
    res.json({ success: true, message: "Food Added" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// List all food items
const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({ success: true, data: foods });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Remove Food Item
const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body._id);

    if (!food) {
      return res
        .status(404)
        .json({ success: false, message: "Food not found" });
    }

    // Remove file if exists
    if (food.image) {
      fs.unlink(`uploads/${food.image}`, (err) => {
        if (err) {
          console.log("⚠ File not found or already deleted:", err.message);
        }
      });
    }

    await foodModel.findByIdAndDelete(req.body._id);
    res.json({ success: true, message: "Food Removed" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export { addFood, listFood, removeFood };