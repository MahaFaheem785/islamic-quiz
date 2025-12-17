import mysql from "mysql2";

const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "islamic_quiz",
  port: 3306
});

db.connect(err => {
  if (err) {
    console.log("DB error:", err.message);
    return;
  }
  console.log("MySQL connected to islamic_quiz");
});

export default db;
