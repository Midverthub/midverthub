import { process_params } from "express/lib/router";
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI

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
            dbName: "Backenddb",
            bufferCommands: true
        })

        console.log("Connected");
    } catch (error) {
        console.log("Error: ", error);
        throw new Error("Error: ", error);

    }
}

export default connect