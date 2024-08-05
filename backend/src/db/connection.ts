import mongoose, { disconnect } from "mongoose";
import {config } from "dotenv"

config()

async function dbConnect(){
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        
    } catch (error) {
        console.log(error);
        throw new Error("Cannot connected to mongoDB")
        
    }
} 

async function disconnectFromDatabase(){
    try {
        await disconnect()
    } catch (error) {
        console.log(error);
        throw new Error("Could not disconnect from MongoDB")
    }
}

export {dbConnect, disconnectFromDatabase}