const express = require("express");
const pool = require("../db");
const router = express.Router();

router.post("/", async (req, res) => {
 const { email, password } = req.body;
 try {
  const result = await pool.query(
   "SELECT * FROM admin WHERE email = $1 AND password = $2",
   [email, password]
  );
  if (result.rows.length > 0) {
   req.session.user = result.rows[0];
   res.status(200).json({ message: "Sign in successful", user: result.rows[0] });
  } else {
   res.status(401).json({ message: "Invalid email or password" });
  }
 } catch (err) {
  res.status(500).json({ message: "Server error", error: err.message });
 }
});

module.exports = router;
