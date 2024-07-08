const Router = require("express")
const router = Router();
const User = require("../model/user");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs");

const secretkey = "snsjsnisjehyrhdbbsiskednj";

router.post("/signup", async(req,res)=>{
    const {username, email, password} = req.body;
    try{
        const hashPassword = await bcrypt.hash(password,10);
        const userCreate = await User.create({
            username:username,
            email:email,
            password:hashPassword,
        })
        const token = jwt.sign({userId:userCreate._id},secretkey,{expiresIn:"5d"})
        return res.status(200).json({userCreate,token,message:"Signup Successfully"})
    }catch(error){
        return res.json({message:`Error Creating account ${error}`})
    }
})

router.post("/login", async(req,res)=>{
    try{
        const {email, password} = req.body;
        const user = await User.findOne({email});

        if(!user){
            return res.status(401).json({
                error:"Invalid email and password",
            })
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            return res.status(401).json({error:"Invalid email or password"})
        }

        const token = jwt.sign({userId:user._id}, secretkey,{expiresIn:"5d"})
        return res.status(201).json({user,token, message: "Logged In Successfully" });
    }catch(error){
        return res.json({message: "Error during login :" + error.message})
    }
})

module.exports = router;