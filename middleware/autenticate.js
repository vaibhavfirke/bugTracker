

const jwt=require('jsonwebtoken');
const authenticate=(req,res,next)=>{
    const token=req.headers.autorization;
    
    if(token){
        const decoded=jwt.verify(token,"bug");
        if (decoded) {
            
            let userId=decoded.UserId
            req.body.userID=userId
            next();
          } else {
            res.send("Login First !");
          }

    }else{
        res.send({msg:"Login First "})
    }
}
module.exports={authenticate}