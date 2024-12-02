import express from "express";
import { signup, login } from "../controllers/user.js";

const router = express.Router();
const format = process.env.MORGAN_FORMAT || "dev";

router.post("/signup", signup);
router.post("/login", login);

export default router;
