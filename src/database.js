import mongoose from "mongoose";
(async () =>{
    try {
        const db = await mongoose.connect('mongodb://127.0.0.1:27017/crud-rvdshop');
        console.log ('DB conectado con',db.connection.name);
    }catch (error){
        console.error(error);
    }
})();