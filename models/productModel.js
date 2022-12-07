import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  amountAvailable: {
    type: Number,
  },
  cost: {
    type: Number,
  },
  productName: {
    type: String,
  },
  sellerId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
});

const Product = mongoose.model("Product", productSchema);
export default Product;
