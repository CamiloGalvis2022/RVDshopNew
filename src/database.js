import mongoose from "mongoose";
import { MONGODB_URI } from "./config";

console.log(MONGODB_URI);
(async () =>{
    try {
        const db = await mongoose.connect('mongodb://127.0.0.1:27017/crud-rvdshop');
        console.log ('DB conectado con',db.connection.name);
    }catch (error){
        console.error(error);
    }
})();