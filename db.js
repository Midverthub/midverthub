
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI

//just added 
const { PrismaClient } = require("@prisma/client");

global.prisma = global.prisma || undefined;


export const db = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") global.prisma = db;
//stops here

const connect = async () => {
    const connectionState = mongoose.connection.readyState

    if (connectionState === 1) {
        console.log("already connected");
        return
    }

    if (connectionState === 2) {
        console.log("Connecting...");
        return
    }

    try {
        mongoose.connect(
            MONGODB_URI, {
            dbName: "midverthub",
            bufferCommands: true
        })

        console.log("Connected");
    } catch (error) {
        console.log("Error: ", error);
        throw new Error("Error: ", error);

    }
}

export default connect