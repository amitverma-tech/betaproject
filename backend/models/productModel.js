// models/productModel.js
import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  unit: String,
  image: String
});

export default mongoose.model("Product", productSchema);
