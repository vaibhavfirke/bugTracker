const express= require('express');
const port=6001;
const cors=require("cors");
const { connection } = require('./config/db');
const { userRoutes } = require('./routes/user.routes');
const { bugRoutes } = require('./routes/bug.route');
const { authenticate } = require('./middleware/autenticate');
const app=express();
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use("/",userRoutes)
app.use(authenticate)
app.use("/bug", bugRoutes)
app.listen(port,async()=>{
    try{
        await connection;
        console.log('database connected')

    }catch(err){
        console.log('database not connected !')
    }
    console.log(`server is running on port ${port}`)
})