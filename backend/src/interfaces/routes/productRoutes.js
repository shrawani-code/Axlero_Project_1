import { Router } from "express";
import { auth, roles } from "../middleware/auth.js";

export function productRoutes(controller) {
  const router = Router();
  router.get("/", controller.list);
  router.get("/mine", auth, roles("vendor", "admin"), controller.vendorProducts);
  router.post("/", auth, roles("vendor", "admin"), controller.create);
  router.put("/:id", auth, roles("vendor", "admin"), controller.update);
  router.delete("/:id", auth, roles("vendor", "admin"), controller.remove);
  return router;
}