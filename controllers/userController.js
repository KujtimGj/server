const User=require('../schemas/userSchema')
const jwt = require('jsonwebtoken')



const createToken = (_id)=>{
    return jwt.sign({_id},process.env.SECRET, {expiresIn:'3d'})
}


//login
const loginUser=async(req,res)=>{
    const {email,password}=req.body

    try{
        const user = await User.login(email,password)
        const token = createToken(user._id)
        res.status(200).json({email,token})
    }catch(error){
        res.status(400).json({error:error.message})
    }
}


//signup

const signupUser = async (req, res) => {
    const { userName, password, role, email, phone } = req.body;

    try {
        const user = await User.signup(userName, password, role, email, phone);
        const token = createToken(user._id)
        res.status(200).json({ user, token });
    } catch (error) {
        res.status(400).json({ error: error.message }); 
    }
};



module.exports={loginUser,signupUser}

