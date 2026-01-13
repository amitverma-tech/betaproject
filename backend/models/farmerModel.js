







import mongoose from "mongoose";
import Counter from "./counterModel.js";

/* ===============================
   HELPER: GET FARMER BY _id OR farmerId
================================ */
export async function getFarmerByAnyId(farmerId) {
  if (mongoose.Types.ObjectId.isValid(farmerId)) {
    const farmer = await Farmer.findById(farmerId);
    if (farmer) return farmer;
  }
  return await Farmer.findOne({ farmerId });
}

/* ===============================
   POND SCHEMA
================================ */
const PondSchema = new mongoose.Schema({
  pondId: {
    type: String,
    required: true,
    index: true,
    // immutable: true
  },

  pondNumber: { type: Number, required: true,  immutable: true },

  pondArea: String,
  pondAreaUnit: { type: String, default: "acre" },
  pondDepth: String,
  pondImage: String,

  overflow: String,
  receivesSunlight: String,
  treesOnBanks: String,
  neighbourhood: String,
  wastewaterEnters: String,

  species: String,
  dateOfStocking: Date,
  qtySeedInitially: String,
  currentQty: String,
  avgSize: String,

  feedType: String,
  feedOther: String,
  feedFreq: String,
  feedQtyPerDay: String,
  feedTime: String,
  recentFeedChanges: String,
  reducedAppetite: String,

  waterTemperature: String,
  pH: String,
  DO: String,
  ammoniaLevel: String,
  phytoplanktonLevel: String,
  waterHardness: String,
  algaeBloom: String,
  pondWaterColor: String,
  sourceOfWater: String,

  diseaseSymptoms: String,
  symptomsObserved: String,
  fishDeaths: String,
  symptomsAffect: String,

  farmObservedDate: Date,
  farmObservedTime: String,

  lastSpecies: String,
  lastHarvestComplete: String,
  recentRainFlood: String,
  pesticideRunoff: String,
  constructionNear: String,
  suddenTempChange: String,

  notes: String,

  pondFiles: [String],
  fishFiles: [String],

  updatedAt: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now }
}, { _id: false });

/* ===============================
   FARMER UPDATE LOG SCHEMA
================================ */
const farmerUpdateSchema = new mongoose.Schema({
  snapshot: { type: Object },
  changes: { type: Object },
  pondFiles: [String],
  fishFiles: [String],
  updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now }
}, { _id: false });

/* ===============================
   FARMER SCHEMA
================================ */
const farmerSchema = new mongoose.Schema({
  farmerId: { type: String, unique: true },

  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

  /* Farmer Basic Details */
  name: { type: String, required: true },
  contact: { type: String, required: true },
  age: String,
  gender: String,
  adhar: String,
  familyMembers: String,
  familyOccupation: String,
  village: String,

  pondCount: { type: Number, default: 0 },
  photo: String,

  /* PONDS ARRAY */
  ponds: [PondSchema],

  /* Farmer level files */
  pondFiles: [String],
  fishFiles: [String],

  /* Update history */
  updates: [farmerUpdateSchema]

}, { timestamps: true });

/* ===============================
   AUTO FARMER ID GENERATION
================================ */
farmerSchema.pre("save", async function () {
  if (this.farmerId) return;

  const year = new Date().getFullYear();

  const counter = await Counter.findOneAndUpdate(
    { id: "farmer" },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );

  const serial = String(counter.seq).padStart(5, "0");
  this.farmerId = `FAR-${year}-${serial}`;
});


const Farmer = mongoose.model("Farmer", farmerSchema);
export default Farmer;


