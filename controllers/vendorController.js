import expressAsync from "express-async-handler";
import { Roles } from "../constants/roles.js";
import Product from "../models/productModel.js";
import User from "../models/userModel.js";

const formatBalance = (balance) => {
  const formats = [100, 50, 20, 10, 5];
  let amount = balance;
  const finalBalance = {};

  formats.forEach((format) => {
    finalBalance[format] = Math.floor(amount / format);
    amount = amount % format;
  });

  return finalBalance;
};

const deposit = expressAsync(async (req, res) => {
  const { userId, depositAmount } = req.body;

  const user = await User.findById(userId);
  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }
  if (user.role !== Roles.BUYER) {
    res.status(400);
    throw new Error("you are not allowd to deposit");
  }

  user.deposit = user.deposit - depositAmount;
  const updatedUser = await user.save();
  if (!updatedUser) {
    res.status(500);
    throw new Error("unable to deposit, please try again!");
  }
  res.status(200).send({
    deposit: formatBalance(updatedUser.deposit),
  });
});

const buy = expressAsync(async (req, res) => {
  const { userId, productId, quantity } = req.body;
  const user = await User.findById(userId);
  if (!user) {
    res.status(400);
    throw new Error("user not found");
  }
  if (user.role !== Roles.BUYER) {
    res.status(400);
    throw new Error("you are not allowd to buy this product");
  }
  const product = await Product.findById(productId);
  if (!product) {
    res.status(400);
    throw new Error("product not found");
  }

  if (
    user.deposit < product.cost * quantity ||
    product.amountAvailable < quantity
  ) {
    res.status(400);
    throw new Error("your balance is not sufficient to purchase this product");
  }

  user.deposit = user.deposit - product.cost * quantity;

  product.amountAvailable = product.amountAvailable - quantity;

  const updatedUser = await user.save();

  if (!updatedUser) {
    res.status(500);
    throw new Error("unablbe to purchase this product, please try again");
  }

  const updatedProduct = await product.save();
  if (!updatedProduct) {
    res.status(500);
    throw new Error("unablbe to purchase this product, please try again");
  }
  res.status(200).send({
    product: product.productName,
    spent: product.cost * quantity,
    change: formatBalance(updatedUser.deposit),
  });
});

const reset = expressAsync(async (req, res) => {
  const { userId } = req.body;
  const user = await User.findById(userId);
  user.deposit = 0;
  const updatedUser = await user.save();
  if (!updatedUser) {
    res.status(500);
    throw new Error("unable to reset balance");
  }
  res.status(200).send({
    message: "deposit reset successfully",
  });
});

export { deposit, buy, reset };
