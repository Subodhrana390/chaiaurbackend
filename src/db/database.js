import mongoose from "mongoose";
import { DB_Name } from "../constants.js";

export const connectDB = async () => {
  try {
    const connectInstance = await mongoose.connect(
      `${process.env.MONGO_URL}/${DB_Name}`
    );
    console.log(`MongoDb Connect on ${connectInstance.connection.host}`);
  } catch (error) {
    console.log("MONGO connected failed : ", error);
    throw error;
  }
};
