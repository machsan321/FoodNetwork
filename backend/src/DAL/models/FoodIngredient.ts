import mongoose from "mongoose";

const ingredientScehma = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  calKg: {
    type: Number,
    trim: true
  },
  calnumItems: {
    type: Number,
    trim: true
  },
  amount: {
    type: Number,
    trim: true
  },
});

export default mongoose.model("ingredients", ingredientScehma);
