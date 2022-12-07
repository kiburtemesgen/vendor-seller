import expressAsync from "express-async-handler";
import Product from "../models/productModel.js";

const createProduct = expressAsync(async (req, res) => {
  const { productName, cost, amountAvailable, sellerId } = req.body;
  const product = await Product.create({
    productName,
    cost,
    amountAvailable,
    sellerId,
  });

  if (!product) {
    res.status(400)
    throw new Error("failed to create product");
  }

  res.status(201).send({
    id: product._id,
    productName: product.productName,
    cost: product.cost,
    amountAvailable: product.amountAvailable,
    sellerId: product.sellerId,
  });
});

const getProduct = expressAsync(async (req, res) => {
  const { productId } = req.body;
  const product = await Product.findById(productId);
  if (!product) {
    res.status(400)
    throw new Error("product not found");
  }

  res.status(200).send(product);
});

const updateProduct = expressAsync(async (req, res) => {
  const {productName, cost, amountAvailable, userId } = req.body;
  const {id} = req.params
  const product = await Product.findById(id);
  if (!product) {
    throw new Error("product not found");
  }
 
  if (userId !== product.sellerId.toString()) {
    res.status(401)
    throw new Error("you are not allowed to update the product");
  }
  product.productName = productName || product.productName;
  product.cost = cost || product.cost;
  product.amountAvailable = amountAvailable || product.amountAvailable;

  const updatedProduct = await product.save();
  if(!updateProduct){
    res.status(500)
    throw new Error('could not update a product')
  }
  res.status(201).json({
    productName: updatedProduct.productName,
    cost: updatedProduct.cost,
    amountAvailable: updatedProduct.amountAvailable,
    sellerId: updatedProduct.sellerId,
  });
});

const deleteProduct = expressAsync(async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;
  const product = await Product.findById(id);
  if (!product) {
    res.status(400)
    throw new Error("product not found");
  }

  if (product.sellerId.toString() !== userId) {
    res.status(401)
    throw new Error("you are not allowed for this operation");
  }
  await product.remove();
  res.status(202).json({
    message: "product removed successfully"
  });
});

export { createProduct, getProduct, updateProduct, deleteProduct };
