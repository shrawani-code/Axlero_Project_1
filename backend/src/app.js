import express from "express";
import cors from "cors";
import { UserRepository } from "./infrastructure/repositories/UserRepository.js";
import { ProductRepository } from "./infrastructure/repositories/ProductRepository.js";
import { AuthService } from "./application/services/AuthService.js";
import { ProductService } from "./application/services/ProductService.js";
import { makeAuthController } from "./interfaces/controllers/authController.js";
import { makeProductController } from "./interfaces/controllers/productController.js";
import { authRoutes } from "./interfaces/routes/authRoutes.js";
import { productRoutes } from "./interfaces/routes/productRoutes.js";
import { env } from "./config/env.js";

const app = express();
app.use(cors({ origin: env.clientUrl }));
app.use(express.json());

const authService = new AuthService(new UserRepository());
const productService = new ProductService(new ProductRepository());

app.get("/api/health", (_, res) => res.json({ status: "ok", project: "Axlero Multi-Vendor Marketplace" }));
app.use("/api/auth", authRoutes(makeAuthController(authService)));
app.use("/api/products", productRoutes(makeProductController(productService)));

app.use((_, res) => res.status(404).json({ message: "Route not found" }));
app.use((err, _, res, __) => {
  console.error(err);
  res.status(500).json({ message: "Internal server error" });
});

export default app;