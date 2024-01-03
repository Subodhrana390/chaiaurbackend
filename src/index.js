import dotenv from "dotenv";
import { app } from "./app.js";
import { connectDB } from "./db/database.js";
dotenv.config({ path: "./.env" });
 
const port = process.env.PORT || 3000;

connectDB()
  .then(() => {
    app.listen(port, () => {
      try {
        console.log(`Server connected on http://localhost:${port}`);
      } catch (error) {
        console.log(error);
      }
    });
  })
  .catch((err) => {
    console.log("Mongo Connection Failed : ", err);
  });

