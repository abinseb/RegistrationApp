const loginRouter = require('express').Router();
const Lmodel = require('../model/Loginmodel');

loginRouter.post('/yiplogin',(req,res)=>{
    try{
        const data = new Lmodel(req.body);
         data.save();
        res.status(200).json("Registered");
    }
    catch(err){
        res.json(err);
    }
});

loginRouter.post('/login',(req,res)=>{
    const {user_id,password} = req.body;
    Lmodel.findOne({user_id:user_id})
    .then(user=>{
       if(user){
        if(user.password == password){
            res.json("Success");
        }
        else{
            res.json("The Password is in correct")
        }
       }
       else{
        res.json("User not found");
       }
    })
    .catch(err=>{
        res.status(500).json(err);
    });
});

module.exports = loginRouter;