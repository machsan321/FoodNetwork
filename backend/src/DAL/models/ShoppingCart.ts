import mongoose, { Schema } from 'mongoose';
import FoodIngredients from './FoodIngredient';
import Iingredient from "../../common/interfaces/Iingredient";

const cartSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  ShoppingCartIngredients: {
    type: [FoodIngredients],
  },
  ExistingIngredients: {
    type: [FoodIngredients],
  },
});

export default mongoose.model("cart", cartSchema);