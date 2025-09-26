const Product = require("../models/Product");
const fs = require("fs");
const path = require("path");

exports.createProduct = async (req, res) => {
  try {
    const { name, price, description, stock } = req.body;
    const image = req.file ? req.file.filename : "";

    const product = await Product.create({ name, price, description, stock, image });
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
  try {
    const { name, price, description, stock } = req.body;

    const updates = {
      name,
      price,
      description,
      stock,
    };

    if (req.file) {
      updates.image = req.file.filename;
    }

    const product = await Product.findByIdAndUpdate(req.params.id, updates, {
      new: true,
    });

    if (!product) return res.status(404).json({ msg: "No encontrado" });

    res.json(product);
  } catch (err) {
    res.status(500).json({ msg: "Error al actualizar producto" });
  }
};


exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ msg: "Producto no encontrado" });
    }

    if (product.image) {
      const imagePath = path.join(__dirname, "..", "uploads", product.image);
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error("Error al eliminar la imagen:", err);
        }
      });
    }

    await Product.findByIdAndDelete(req.params.id);

    res.json({ msg: "Producto eliminado" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error al eliminar el producto" });
  }
};