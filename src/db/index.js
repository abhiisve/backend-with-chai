import mongoose from 'mongoose';
import { DB_name } from "../constant.js";

const connectDb = async ()=>{
    try {
       const connection_instant = await mongoose.connect(`${process.env.MongoDB_URI}/${DB_name}`);
       console.log(`mongodb connect !! Dbhost ${connection_instant.connection.host}`);
    } catch (error) {
        console.log("mongodb error: " , error);
        process.exit(1);
    }
}

export default connectDb;