import express from "express";
import { getAllUsers, getUser } from "../controllers/userController.js";

const router = express.Router();

router.get("/:userId", getUser);
router.get("/", getAllUsers);

export default router;
