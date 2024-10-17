const express = require("express");
const router = express.Router();
const pool = require("../config/db"); // Import the DB connection
const authenticateToken = require("../middleware/auth"); // Ensure the user is authenticated

// Add an expense
router.post("/add", authenticateToken, async (req, res) => {
  const { user_id, amount, category, date, description } = req.body;

  try {
    const newExpense = await pool.query(
      "INSERT INTO expenses (user_id, amount, category, date, description) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [user_id, amount, category, date, description]
    );
    res.json(newExpense.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

// Get all expenses for a user
router.get("/:user_id", authenticateToken, async (req, res) => {
  try {
    const expenses = await pool.query(
      "SELECT * FROM expenses WHERE user_id = $1",
      [req.params.user_id]
    );
    res.json(expenses.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
