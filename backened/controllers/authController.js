import bcrypt from "bcryptjs";
import {
  createUser,
  findUserByEmail,
  saveResult,
  getResultsByEmail,
} from "../models/User.js";

export const signup = (req, res) => {
  const { name, email, password } = req.body;
  const hashed = bcrypt.hashSync(password, 10);

  createUser({ name, email, password: hashed }, () =>
    res.json({ msg: "Signup success" })
  );
};

export const login = (req, res) => {
  const { email, password } = req.body;

  findUserByEmail(email, (err, result) => {
    const user = result[0];
    if (!bcrypt.compareSync(password, user.password))
      return res.status(401).json({ msg: "Wrong password" });

    res.json({ user });
  });
};

export const saveQuizResult = (req, res) => {
  const { email, name, category, score, total } = req.body;

  saveResult(email, name, { category, score, total }, () =>
    res.json({ msg: "Result saved" })
  );
};

export const getUserResults = (req, res) => {
  getResultsByEmail(req.params.email, (err, results) =>
    res.json(results)
  );
};
