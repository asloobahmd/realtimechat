import express from "express";
import {
  createConversation,
  getConversation,
} from "../controllers/convoController.js";
const router = express.Router();

router.post("/", createConversation);
router.get("/:userId", getConversation);

export default router;
