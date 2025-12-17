import db from "../config/db.js";

export const createUser = (user, cb) => {
  db.query("INSERT INTO users SET ?", user, cb);
};

export const findUserByEmail = (email, cb) => {
  db.query("SELECT * FROM users WHERE email=?", [email], cb);
};

export const saveResult = (email, name, result, cb) => {
  const sql =
    "INSERT INTO results (email, name, category, score, total) VALUES (?, ?, ?, ?, ?)";
  db.query(
    sql,
    [email, name, result.category, result.score, result.total],
    cb
  );
};

export const getResultsByEmail = (email, cb) => {
  db.query("SELECT * FROM results WHERE email=?", [email], cb);
};
