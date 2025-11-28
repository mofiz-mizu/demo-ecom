import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    items: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        quantity: Number,
        price: Number,
      },
    ],
    status: { type: String, default: "pending" },
    paymentStatus: { type: String, default: "unpaid" },
    totalPrice: Number,
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
