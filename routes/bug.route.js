const express = require("express");
const { bugModel } = require("../model/bug.model");
const bugRoutes = express.Router();

bugRoutes.get("/", async (req, res) => {
  
 try{
    const userID=req.body.userID
    const data=await bugModel.find({userID:userID});
    res.send(data)


 }catch(err){
    res.send({msg:err})
 }
});

bugRoutes.post("/",async(req,res)=>{
    const body=req.body;
    console.log(body)
    try{
        const data=new bugModel(body)
        await data.save();
        res.send({msg:"Data Posted"})

    }catch(err){
        res.send({msg:err})
    }
})

bugRoutes.delete("/:id",async(req,res)=>{
    
    const ID=req.params.id
   
    try{
        const data=await bugModel.findByIdAndDelete({_id:ID})
        
        res.send({msg:"Data Deleted"})

    }catch(err){
        res.send({msg:err})
    }
})

module.exports={bugRoutes}