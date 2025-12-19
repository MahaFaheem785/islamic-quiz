import bcrypt from "bcryptjs";
import {
  createUser,
  findUserByEmail,
  saveResult,
  getResultsByEmail,
} from "../models/User.js";

/* ================= SIGNUP ================= */
export const signup = (req, res) => {
  const { name, email, password } = req.body;

  const hashed = bcrypt.hashSync(password, 10);

  createUser({ name, email, password: hashed }, (err) => {
    if (err) {
      return res.status(500).json({ msg: "Signup failed" });
    }

    res.json({ msg: "Signup success" });
  });
};

/* ================= LOGIN ================= */
export const login = (req, res) => {
  const { email, password } = req.body;

  findUserByEmail(email, (err, result) => {
    // ✅ DB error check
    if (err) {
      return res.status(500).json({ msg: "Database error" });
    }

    // ✅ User not found (VERY IMPORTANT)
    if (!result || result.length === 0) {
      return res.status(401).json({ msg: "Invalid email or password" });
    }

    const user = result[0];

    // ✅ Password check
    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ msg: "Invalid email or password" });
    }

    // ✅ Success (do NOT send password)
    res.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  });
};

/* ================= SAVE QUIZ RESULT ================= */
export const saveQuizResult = (req, res) => {
  const { email, name, category, score, total } = req.body;

  saveResult(email, name, { category, score, total }, (err) => {
    if (err) {
      return res.status(500).json({ msg: "Failed to save result" });
    }

    res.json({ msg: "Result saved" });
  });
};

/* ================= GET USER RESULTS ================= */
export const getUserResults = (req, res) => {
  getResultsByEmail(req.params.email, (err, results) => {
    if (err) {
      return res.status(500).json({ msg: "Failed to fetch results" });
    }

    res.json(results);
  });
};
