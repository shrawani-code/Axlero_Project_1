import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, default: "" },
  price: { type: Number, required: true, min: 0 },
  category: { type: String, required: true, trim: true },
  stock: { type: Number, default: 0, min: 0 },
  image: { type: String, default: "" },
  vendorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
}, { timestamps: true });

export const ProductModel = mongoose.model("Product", productSchema);