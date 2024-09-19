const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

const auth = require("./routes/auth");
app.use("/auth", auth);

const generate = require("./routes/generate");
app.use("/generate", generate);

const attendance = require("./routes/attendenceController");

app.use("/attendance", attendance);

const port = 3000;
app.get("/", (req, res) => {
  res.status(200).send("Idiot server Running Successfully Get Lost ....");
});

app.listen(port, (req, res) => {
  console.log(`Idiot server is running at ${port}`);
});
