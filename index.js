import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import User from "./db/User.js";

const app = express();
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 30010;

const URL =
  "mongodb+srv://dada:dada@cluster0.qpjjg.mongodb.net/ecomm?retryWrites=true&w=majority";

mongoose
  .connect(URL)
  .then(() => {
    console.log("connection succes");
  })
  .catch((err) => console.log(`no connection`, err));

app.post("/register", async (req, res) => {
  let user = new User(req.body);
  let result = await user.save();
  result = result.toObject();
  delete result.pass;
  res.send(result);
});


app.post("/login", async (req, res) => {
  if (req.body.pass && req.body.email) {
    let user = await User.findOne(req.body).select("-pass");
    if (user) {
      res.send(user);
    } else {
      res.send({ result: "No User" });
    }
  } else {
    res.send("user not found");
  }
});

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
