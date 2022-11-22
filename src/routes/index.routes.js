import { error } from 'console';
import {Router} from 'express';
import task from '../models/task';

const router =Router();

router.get('/carrito', async(req,res) =>{
    const tarea =await task.find().lean();
    console.log(tarea);
    res.render('carrito',{tasks: tarea});
});

router.get('/', async(req,res) =>{
    const tarea =await task.find().lean();
    res.render('index',{tasks: tarea});
});

router.post('/tarea/add',async(req,res)=>{
    try{
        const tarea=task(req.body);
        await tarea.save();
        res.redirect('/');
    }catch{
        console.log(error);
        res.send('Haz enviado un ID o URL repetida')
    }
      
})

router.get('/edit/:id',async(req,res) =>{
    try{
        const tarea= await task.findById(req.params.id).lean();
        res.render('edit',{task:tarea}); 
    }catch{
        console.log(error);
    }
});
router.post('/edit/:id',async(req,res) =>{
    try {
        const {id}=req.params;
        await task.findByIdAndUpdate(id,req.body);
        res.redirect('/');  

    } catch (error) {
        console.log(error);
    }
    
   
});

router.get('/delete/:id',async(req,res) =>{
    try{
        const {id}=req.params;
        await task.findByIdAndDelete(id);
        res.redirect('/');  
 
    }catch{
        console.log(error);
    }
});


export default router;