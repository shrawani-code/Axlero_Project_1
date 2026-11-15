import { Product } from "../../domain/entities/Product.js";

export class ProductService {
  constructor(productRepository) { this.productRepository = productRepository; }

  async create(input, vendorId) {
    const entity = new Product({ ...input, vendorId });
    return this.productRepository.create(entity);
  }

  async list(query) {
    const filters = {};
    if (query.category) filters.category = query.category;
    if (query.vendorId) filters.vendorId = query.vendorId;
    if (query.minPrice || query.maxPrice) {
      filters.price = {};
      if (query.minPrice) filters.price.$gte = Number(query.minPrice);
      if (query.maxPrice) filters.price.$lte = Number(query.maxPrice);
    }
    return this.productRepository.findAll(filters);
  }

  async update(id, input, user) {
    const product = await this.productRepository.findById(id);
    if (!product) throw new Error("Product not found");
    if (user.role !== "admin" && product.vendorId._id.toString() !== user.id) {
      throw new Error("You can modify only your own products");
    }
    return this.productRepository.updateById(id, input);
  }

  async remove(id, user) {
    const product = await this.productRepository.findById(id);
    if (!product) throw new Error("Product not found");
    if (user.role !== "admin" && product.vendorId._id.toString() !== user.id) {
      throw new Error("You can delete only your own products");
    }
    await this.productRepository.deleteById(id);
    return { message: "Product deleted" };
  }

  async vendorProducts(vendorId) {
    return this.productRepository.findByVendor(vendorId);
  }
}