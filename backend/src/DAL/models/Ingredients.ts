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
  picture: {
    type: String,
    required: true,
  },
  calories: {
    type: Number
  },
});

export default mongoose.model("ingredients", ingredientsSchema);
