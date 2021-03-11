import mongoose, { Schema } from 'mongoose';
import RecipeIngredient from './RecipeIngredient';
import Iingredient from "../../common/interfaces/Iingredient";

const cartSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  ShoppingCartIngredients: {
    type: Array<Iingredient>(),
  },
  ExistingIngredients: {
    type: Array<Iingredient>(),
  },
});

export default mongoose.model("carts", cartSchema);