import Order from "../models/orderModel.js";
import Cart from "../models/cartModel.js";

export const createOrder = async (req, res) => {
  const cart = await Cart.findOne({ userId: req.user.id }).populate(
    "items.productId"
  );

  if (!cart) return res.status(400).json({ message: "Cart empty" });

  const items = cart.items.map((item) => ({
    productId: item.productId._id,
    quantity: item.quantity,
    price: item.productId.price,
  }));

  const totalPrice = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const order = await Order.create({
    userId: req.user.id,
    items,
    totalPrice,
  });

  await Cart.deleteOne({ userId: req.user.id });

  res.json(order);
};

export const getOrders = async (req, res) => {
  const orders = await Order.find({ userId: req.user.id });
  res.json(orders);
};
