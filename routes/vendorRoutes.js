import express from "express";
import { buy, deposit, reset } from "../controllers/vendorController.js";

const router = express.Router();

router.route("/deposit").post(deposit);
router.route("/buy").get(buy);
router.route("/reset").put(reset);

export default router;
