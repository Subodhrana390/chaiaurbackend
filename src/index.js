import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./db/database.js";
import cors from "cors";
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.get("/", (req, res) => {
  res.send("hello world");
});

app.on("error", (error) => {
  console.log("error : ", error);
  throw error;
});

app.listen(port, () => {
  try {
    connectDB();
    console.log(`http://localhost:${port}`);
  } catch (error) {
    console.log(error);
  }
});
