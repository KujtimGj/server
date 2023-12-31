const mongoose = require('mongoose')
const bcrypt=require('bcrypt')
const validator=require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
  userName: {
    type: String,
    required: true
  },
  password:{
    type: String,
    required: true,
  },
  role: {
    type: Number,
    required: true
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  phone:{
    type:Number,
    required:true
  }
}, { timestamps: true })


//static signup method
userSchema.statics.signup = async function(userName, password, role, email, phone){

  //validation
  if(!userName || !password || !email || !phone){
    throw Error("All fields must be filled")
  }

  if(!validator.isEmail(email)){
    throw Error("Email is not valid")
  }
  if(!validator.isStrongPassword(password)){
    throw Error("Password not strong enough")
  }

  const exists=await this.findOne({email})

  if(exists){
    throw Error('Email already in use')
  }

  //hash pass

  const salt = await bcrypt.genSalt(10)
  const hash= await bcrypt.hash(password,salt)

  const user = await this.create({userName,password:hash,role,email,phone})

  return user

}

userSchema.statics.login = async function(email,password){
  if(!email || !password){
      throw Error("All fields must be filled!")
  }

  const user = await this.findOne({email})

  if(!user){
      throw Error("Incorrect email")
  }
  const match = await bcrypt.compare(password,user.password)

  if(!match){
      throw Error("Incorrect password")
  }

  return user
}




module.exports = mongoose.model('User', userSchema)