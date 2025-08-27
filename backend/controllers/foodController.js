import foodModel from "../models/foodModels.js";
import fs from 'fs';

// Add Food Item

const addFood = async (request, response) => {
  try {
    const image_filename = request.file ? request.file.filename : null;

    const food = new foodModel({
      name: request.body.name,
      description: request.body.description,
      price: request.body.price,
      category: request.body.category,
      image: image_filename
    });

    await food.save();
    response.json({ success: true, message: "Food Added" });
  } catch (error) {
    response.status(500).json({ success: false, message: error.message });
  }
};

// all food list
const listFood = async (request, response) => {
  try{
    const foods = await foodModel.find({});
    response.json({ success: true, data: foods });
  } catch (error) {
    response.status(500).json({ success: false, message: error.message });
  }
}

export { addFood, listFood };