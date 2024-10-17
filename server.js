const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); // Allow communication between frontend (React) and backend (Express)
app.use(express.json()); // Parse incoming JSON data

// Import and use routes
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

// *** Add the missing expenses route here ***
const expenseRoutes = require("./routes/expenses"); // Import the expenses routes
app.use("/api/expenses", expenseRoutes); // Use the expenses routes for requests to /api/expenses

// Route testing
app.get("/", (req, res) => {
  res.send("Hello from the personal budgeting app backend!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
