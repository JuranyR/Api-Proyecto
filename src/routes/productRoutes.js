const express = require("express");
const {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct
} = require("../controllers/productController");
const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");
const router = express.Router();

router.route("/")
  .post(protect, upload.single("image"), createProduct) 
  .get(getProducts);

router.route("/:id")
  .get(getProduct)
  .put(protect, upload.single("image"), updateProduct)
  .delete(protect, deleteProduct);

module.exports = router;
