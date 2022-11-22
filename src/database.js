import mongoose from "mongoose";


const MONGODB_URI =process.env.MONGODB || 'mongodb://127.0.0.1:27017/crud-rvdshop';
//const uri='mongodb+srv://RVDshop:emtZiSg5ti4783AU@cluster0.bkqvd8j.mongodb.net/?retryWrites=true&w=majority'

(async () =>{
    try {
        const db = await mongoose.connect('mongodb+srv://RVDshop:emtZiSg5ti4783AU@cluster0.bkqvd8j.mongodb.net/?retryWrites=true&w=majority');
        console.log ('DB conectado con',db.connection.name);
    }catch (error){
        console.error(error);
    }
})();