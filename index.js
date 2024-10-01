const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

const auth = require("./routes/profile");
app.use("/profile", auth);

const generate = require("./routes/batch");
app.use("/batch", generate);

const attendance = require("./routes/attendenceController");

app.use("/attendance", attendance);

const port = 3000;
app.get("/", (req, res) => {
  res.status(200).send("Idiot server Running Successfully Get Lost ....");
});

app.listen(port, (req, res) => {
  console.log(`Idiot server is running at ${port}`);
});
