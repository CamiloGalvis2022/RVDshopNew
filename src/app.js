import express from 'express';
import {create} from 'express-handlebars';
import indexRoutes from './routes/index.routes';
import path from 'path';
import morgan from 'morgan';


const app= express();


app.set("views",path.join(__dirname,"views"));

const exphbs=create({
        layoutsDir:path.join(app.get("views"),"layouts"),
        defaultLayout:"main",
        extname:"hbs",
    });
app.engine('.hbs',exphbs.engine);
app.set("view engine",".hbs");


app.use(morgan('dev'));
app.use(express.urlencoded({extented:false}));

app.use(indexRoutes);

app.use(express.static(path.join(__dirname,"public")));

export default app; 