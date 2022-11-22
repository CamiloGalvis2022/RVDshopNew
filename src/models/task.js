import { Schema,model } from "mongoose";

const tarea= new Schema({
    id:{
        type:Number,
        required:true,
        unique:true
    },
    precio : {
        type:Number,
        required:true
    },
    descripcion: String,
    url :{
        type:String,
        required:true,
        unique:true
    },
    stock: {
        type:Number,
        required:true,
}
},
{
    versionKey:false
}
);
export default model('rvd-shops',tarea);