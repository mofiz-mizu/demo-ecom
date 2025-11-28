import express from "express";
import { getCart, addToCart } from "../controllers/cartController.js";
import { auth } from "../middlewares/auth.js";

const router = express.Router();

router.get("/", auth, getCart);
router.post("/", auth, addToCart);

export default router;
