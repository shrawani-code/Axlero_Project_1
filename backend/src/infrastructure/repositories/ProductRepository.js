import { ProductModel } from "../models/ProductModel.js";

export class ProductRepository {
  async create(data) { return ProductModel.create(data); }
  async findAll(filters = {}) { return ProductModel.find(filters).populate("vendorId", "name email"); }
  async findById(id) { return ProductModel.findById(id).populate("vendorId", "name email"); }
  async updateById(id, data) { return ProductModel.findByIdAndUpdate(id, data, { new: true, runValidators: true }); }
  async deleteById(id) { return ProductModel.findByIdAndDelete(id); }
  async findByVendor(vendorId) { return ProductModel.find({ vendorId }); }
}