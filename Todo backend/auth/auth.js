const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const User = require("../database/user");

const SECRET_KEY = "tgbvhfruyshdhdvsfdfevdsvsds";
async function register(req, res) {
  let mobile_number = req.body.mobile_number;
  let name = req.body.name;
  let password = req.body.password;
  let email=req.body.email;

//   password= bcrypt.hashSync(password, 20);

  const user = await User.findOne({
    email,
  });

  if (user) {
    return res.status(400).send({
      message: "User already registered",
    });
  }

  await User.create({
    email,
    name,
    mobile_number,
    password,
    todo:[
    ]
  });

  return res.status(200).send({
    data:email,
    message: "User registered successfully",
  });
}

async function login(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({
    email,
  });

  if (!user) {
    return res.status(404).send({
      message: "EMAIL NOT REGISTERED",
    });
  }
  const matched =  user.password;
  

  if (matched==password){
    const {name,email}=user;
    const token = jwt.sign({ name, email }, SECRET_KEY);
  
    return res.status(200).send({
    message: "Login Successful",
    token,
    user: {
      name: user.name,
      mobile_number:user.mobile_number,
      email: user.email,
    },
  });
}else{
   return res.status(400).send({message:"Invalid Password"});
}
}
async function loggedinuser(req,res){
const token=req.headers.authtoken;
if(token){

try{
    jwt.verify(token, SECRET_KEY);
}
catch(err){
    return res.status(400).send({message:"Invalid token"}); 
}   
}
const decode=jwt.decode(token);
const user=await User.findOne({
    email:decode.email
});
return res.status(200).send({
    name:user.name,
    email:user.email,
    mobile_number:user.mobile_number
});
}
module.exports = {
  register,
  login,
  loggedinuser,
  
};
