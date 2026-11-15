export class Product {
  constructor({ name, description = "", price, category, stock = 0, image = "", vendorId }) {
    if (!name || price === undefined || !category || !vendorId) {
      throw new Error("Name, price, category and vendorId are required");
    }
    if (Number(price) < 0) throw new Error("Price cannot be negative");
    this.name = name.trim();
    this.description = description.trim();
    this.price = Number(price);
    this.category = category.trim();
    this.stock = Number(stock);
    this.image = image.trim();
    this.vendorId = vendorId;
  }
}