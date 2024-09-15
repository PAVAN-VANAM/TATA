const express = require("express");
const app = express();
const attendenceRoutes = require("./attendence/routes");
const bodyParser = require("body-parser");
const pool = require("./db");

app.use(bodyParser.json());

app.get("/login", async (req, res) => {
  const { email, password } = req.body;
  // Ensure email and password are provided
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    // Query the login table for the user with the provided email
    const result = await pool.query("SELECT * FROM login WHERE email = $1", [
      email,
    ]);

    // If no user is found with the provided email
    if (result.rows.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Extract user data (email and password) from the result
    const user = result.rows[0];

    // Check if the provided password matches the stored password
    if (password === user.password) {
      return res.status(200).json({ message: "Login successful", user: user });
    } else {
      return res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

const port = 3000;
app.get("/", (req, res) => {
  res.status(200).send("Get Lost ....");
});

app.use("/api/attendence", attendenceRoutes);

app.listen(port, (req, res) => {
  console.log(`Idiot server is running at ${port}`);
});
