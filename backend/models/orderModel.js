



// models/orderModel.js
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  dealerId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Dealer" 
  },
  address: String,

  items: [
    {
      productId: String, // ✅ String type (numeric ya alphanumeric dono accept karega)
      name: String,
      price: Number,
      qty: Number
    }
  ],

  totalAmount: Number,
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

export default mongoose.model("Order", orderSchema);