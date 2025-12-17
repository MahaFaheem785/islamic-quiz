import express from "express";
import {
  signup,
  login,
  saveQuizResult,
  getUserResults,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/save-result", saveQuizResult);
router.get("/results/:email", getUserResults);

export default router;
