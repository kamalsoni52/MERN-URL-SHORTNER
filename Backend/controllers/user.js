const User = require("../models/users");

const {setUser} = require("../service/auth");

const handleUserSignUp = async (req,res) =>{
    const {username, email, password } =req.body;
    try{
        await User.create({
            username,
            email,
            password,
        });
        return res.status(201).json({"msg":"Email id successfully registered"});
    }
    catch(error){
        return res.status(409).json({"msg":"Email id already exist"});
    }
    
}

const handleUserLogin= async (req,res) =>{
    const { email, password } =req.body;
    if(!email || !password) return res.status(400).json({"msg": "Email and password required"})

    const user = await User.findOne({
        email,
        password,
    });
    if(!user) return res.status(409).json({
        error: "Invalid Email or password",
    })


    const jwtToken = setUser(user); 
    res.cookie("jwtToken", jwtToken,{
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000
    })
    return res.status(200).json({"accessToken": jwtToken, "user": user.username, "role": user.role });
}



module.exports = {
    handleUserSignUp,
    handleUserLogin,
}