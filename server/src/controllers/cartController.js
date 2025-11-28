import Cart from "../models/cartModel.js";

export const getCart = async (req, res) => {
  const cart = await Cart.findOne({ userId: req.user.id }).populate(
    "items.productId"
  );
  res.json(cart || { items: [] });
};

export const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;

  let cart = await Cart.findOne({ userId: req.user.id });

  if (!cart) {
    cart = await Cart.create({
      userId: req.user.id,
      items: [{ productId, quantity }],
    });
  } else {
    const item = cart.items.find((i) => i.productId == productId);

    if (item) item.quantity += quantity;
    else cart.items.push({ productId, quantity });

    await cart.save();
  }

  res.json(cart);
};
