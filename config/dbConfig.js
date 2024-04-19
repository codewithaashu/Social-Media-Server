//connect to mongoDB database

//to connect with mongoDB, we have to import mongoose
import mongoose from "mongoose";

//connect with mongoDB
const connectDB = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.MONGODB_URL);
    console.log(`MongoDB is successfully connected at port ${connection.port}`);
  } catch (err) {
    console.log("MongoDB Connection Error : ", err.message);
  }
};

export default connectDB;
