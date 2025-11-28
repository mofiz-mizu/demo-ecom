import express from "express";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import { auth, admin } from "../middlewares/auth.js";

const router = express.Router();

router.get("/", getProducts);
router.post("/", auth, admin, createProduct);
router.put("/:id", auth, admin, updateProduct);
router.delete("/:id", auth, admin, deleteProduct);

export default router;
