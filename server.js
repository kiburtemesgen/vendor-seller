import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import vendorRoutes from "./routes/vendorRoutes.js"
import errorHandler from './utils/errorHandler.js'

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use("/users", userRoutes);
app.use("/products", productRoutes);
app.use("/vendor", vendorRoutes);


app.use(errorHandler)
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`server is running on ${PORT}`));
