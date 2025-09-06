const Product = require("../models/Product");

exports.createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.json(product);
  } catch (err) {
    res.status(500).json({ msg: "Error al crear producto" });
  }
};

exports.getProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};


exports.getProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ msg: "No encontrado" });
  res.json(product);
};


exports.updateProduct = async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!product) return res.status(404).json({ msg: "No encontrado" });
  res.json(product);
};


exports.deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ msg: "Producto eliminado" });
};