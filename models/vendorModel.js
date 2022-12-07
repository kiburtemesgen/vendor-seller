import mongoose from "mongoose";

const vendorSchema = new mongoose.Schema({
  products: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Product",
    },
  ],
  user: [
    {
        type: mongoose.Schema.ObjectId,
        ref: "User"
    },
  ]
});

const Vendor = mongoose.model("Vendor", vendorSchema);
export default Vendor;
