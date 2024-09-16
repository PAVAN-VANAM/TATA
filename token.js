const express = require("express");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const app = express();
const pool = require("./db");
const attendenceRoutes = require("./attendence/routes");

const JWT_SECRET = "your_secret_key";

const users = {
  "21ag1a0000": {
    password: bcryptjs.hashSync("123", 10),
  },
};

app.use(express.json());

app.post("/login", (req, res) => {
  const { userId, password } = req.body;

  if (!userId || !password) {
    return res
      .status(400)
      .json({ message: "User ID and password are required" });
  }

  const user = users[userId];
  if (!user) {
    return res.status(401).json({ message: "Invalid User ID or password" });
  }

  if (!bcryptjs.compareSync(password, user.password)) {
    return res.status(401).json({ message: "Invalid User ID or password" });
  }

  const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: "1h" });

  res.status(200).json({ token });
});

const authenticateJWT = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

app.use("/api/attendence", authenticateJWT, attendenceRoutes);

app.get("/reg", (req, res) => {
  res.send("Hello");
});

app.get("/", (req, res) => {
  res.status(200).send("Get Lost ....");
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
