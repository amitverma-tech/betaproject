

import mongoose from "mongoose";

// ------------------------------
// ⭐ Dealer Update History Schema
// ------------------------------
const dealerUpdateSchema = new mongoose.Schema(
  {
    snapshot: Object,       // Old data ka pura backup
    changes: Object,        // ✅ Field-wise changes
    image: String,          // Old image
    createdAt: { type: Date, default: Date.now }
  },
  { _id: false }
);

// ------------------------------
// ⭐ Main Dealer Schema
// ------------------------------
const dealerSchema = new mongoose.Schema({
  
  // Basic Required Fields
  name: { type: String, required: true },
  contact: { type: String, required: true },
  
  // Updated Fields (ISDN → GST Number)
  gstNumber: { type: String }, // ✅ ISDN se change hua
  
  // Updated / New Field
  shopAddress: { type: String, required: true },

  // Image Path
  image: { type: String },

  // User Who Created The Dealer
  createdBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },

  // ⭐ History Updates
  updates: [dealerUpdateSchema],

  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Dealer", dealerSchema);