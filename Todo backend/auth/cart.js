const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const User = require("../database/user");
const SECRET_KEY = "tgbvhfruyshdhdvsfdfevdsvsds";

async function getCart(req,res){
    const token=req.headers.authtoken;
    if(token){
    
    try{
        jwt.verify(token, SECRET_KEY);
    }
    catch(err){
        return res.status(400).send("invalid token"); 
    }   
    }
    const decode=jwt.decode(token);
    const user=await User.findOne({
        email:decode.email
    });
    let todo=user.todo;
    return res.status(200).send({
        todo,
    });
}
async function addCart(req,res){
    const token=req.headers.authtoken;
    const {task_name,tag,pending}=req.body;
    if(token){
    
    try{
        jwt.verify(token, SECRET_KEY);
    }
    catch(err){
        return res.status(400).send("Invalid token"); 
    }   
    }
    const decode=jwt.decode(token);
    const user=await User.findOne({
        email:decode.email
    });
    let Cart=user.todo;
   if(!task_name){
       return res.status(400).send("Invalid request"); 
   }else{
    let index = null
    Cart.forEach((el, i) => {
        if (el.task_name == task_name) {
            index = i;
        }
    })

    if (index == null) {
        Cart.push({
          task_name,
          pending,
          tag
        });
    } else {
        return res.status(400).send("Task already registered."); 
    }
    }
    await User.findOneAndUpdate({
        email:decode.email
    },{
       todo:Cart
    })
    let todo=user.todo;
    return res.status(200).send({
        todo,
    });
}
async function deleteCart(req,res){
    const token=req.headers.authtoken;
    const {task_name}=req.body;
    if(token){
    
    try{
        jwt.verify(token, SECRET_KEY);
    }
    catch(err){
        return res.status(400).send("Invalid User"); 
    }   
    }
    const decode=jwt.decode(token);
    const user=await User.findOne({
        email:decode.email
    });
    let Cart=user.todo;

    let index = null
    Cart.forEach((el, i) => {
        if (el.task_name == task_name) {
            index = i;
        }
    })

    if (index == null) {
        return res.status(400).send("Invalid Request"); 
    } else {
        Cart.splice(index, 1);
    }
  
    await User.findOneAndUpdate({
        email:decode.email
    },{
       todo:Cart
    })
    let todo=user.todo;
    return res.status(200).send({
       todo,
    });
}

async function updateCart(req,res){
    const token=req.headers.authtoken;
    const {task_name,pending}=req.body;
    if(token){
    try{
        jwt.verify(token, SECRET_KEY);
    }
    catch(err){
        return res.status(400).send("Invalid token"); 
    }   
    }
    const decode=jwt.decode(token);
    const user=await User.findOne({
        email:decode.email
    });
    let Cart=user.todo;

    let index = null;
    Cart.forEach((el, i) => {
        if (el.task_name == task_name) {
            index = i;
        }
    })

    if (index == null) {
        return res.status(400).send("Task not added.");
    } else {
    if(pending===true){
        Cart[index].pending=false;
    }
    else{
        Cart[index].pending=true;
    }
    }
  
    await User.findOneAndUpdate({
        email:decode.email
    },{
       todo:Cart
    })
   let todo=user.todo;
    return res.status(200).send({
       todo,
    });
}

module.exports={
    getCart,
    addCart,
    deleteCart,
    updateCart
}