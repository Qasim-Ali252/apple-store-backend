import { Router } from "express";
import {
  getProducts,
  searchProducts,
  getCategories,
  getProductsByCategory,
  getProductById,
} from "../controllers/productController.js";

const router = Router();

router.get("/", getProducts);
router.get("/search", searchProducts);
router.get("/categories", getCategories);
router.get("/category/:category", getProductsByCategory);
router.get("/:id", getProductById);

export default router;
