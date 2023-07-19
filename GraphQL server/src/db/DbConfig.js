import mongoose from "mongoose";
import { DB_URL } from "../../config.js";

export async function connectDb(){
    try {
        await mongoose.connect(DB_URL)
        console.log(`database connection successfully......`)

    } catch (error) {
        console.log(error)
        console.log(`error in database connection..........`)
        
    }
}