import Product from "../models/productModel.js";

export const getProducts = async (req, res) => {
  const { search, category, sort = "price", order = "asc" } = req.query;

  const query = {};

  if (search) query.name = { $regex: search, $options: "i" };
  if (category) query.category = category;

  const products = await Product.find(query).sort({
    [sort]: order === "asc" ? 1 : -1,
  });

  res.json(products);
};

export const createProduct = async (req, res) => {
  const product = await Product.create(req.body);
  res.json(product);
};

export const updateProduct = async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(product);
};

export const deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};
