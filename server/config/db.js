
import mongoose from "mongoose";

export const connectDB = async(URI)=>{
  try{
    await mongoose.connect(URI);
  } catch(error) {
    console.log(error);
  }
}