import mongoose, { Schema } from "mongoose";

const recipeIngredientScehma = new mongoose.Schema({
  name: {
    type: Schema.Types.ObjectId,
    ref: "ingredients",
  },
  amount: {
    type: Number,
    trim: true,
  },
  comment: {
    type: String,
  },
});

export default mongoose.model("recipe", recipeIngredientScehma);
