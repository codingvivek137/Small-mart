import mongoose from "mongoose";

const DB_connect=async()=>{
    try {
        const connect=await mongoose.connect(process.env.MONGO_URL);
        console.log(`conneted to ${connect.connection.host}`)
    } catch (error) {
        console.log(`error is ${error}`);
    }
}

export default DB_connect;