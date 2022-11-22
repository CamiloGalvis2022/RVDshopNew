import mongoose from "mongoose";
import { MONGODB_URI } from "./config";

console.log(MONGODB_URI);
(async () =>{
    try {
        const db = await mongoose.connect('mongodb+srv://RVDshop:emtZiSg5ti4783AU@cluster0.bkqvd8j.mongodb.net/?retryWrites=true&w=majority');
        console.log ('DB conectado con',db.connection.name);
    }catch (error){
        console.error(error);
    }
})();