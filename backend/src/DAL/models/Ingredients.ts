import mongoose from "mongoose";

const ingredientsSchema = new mongoose.Schema({
  name: {
    he: {
      type: String,
      unique: true,
      required: true,
    },
    en: {
      type: String,
      unique: true,
      required: true,
    },
  },
  calKg: {
    type: Number,
    trim: true,
  },
  calnumItems: {
    type: Number,
    trim: true,
  },
  amount: {
    type: Number,
    trim: true,
  },
});

export default mongoose.model("ingredients", ingredientsScehma);
