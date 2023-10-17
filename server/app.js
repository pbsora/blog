const express = require("express");
const app = express();

const bcrypt = require("bcryptjs");
require("dotenv").config();
const cors = require("cors");

const postRouter = require("./routes/posts");

const mongoose = require("mongoose");
mongoose.connect(process.env.DB_URL).catch((err) => console.log(err));
const User = require("./models/User");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use("/api", postRouter);

//----------------------------End of middleware --------------------------//

app.get("/", (req, res) => {
  res.send("deu");
});

app.post("/user", async (req, res) => {
  password = await bcrypt.hash(req.body.password, 10);
  const user = new User({
    username: req.body.username,
    password,
  });
  await user.save();
  res.json({ message: "User created sucessfully" });
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
