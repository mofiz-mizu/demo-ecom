import express from "express";
import { createOrder, getOrders } from "../controllers/orderController.js";
import { auth } from "../middlewares/auth.js";

const router = express.Router();

router.post("/", auth, createOrder);
router.get("/", auth, getOrders);

export default router;
