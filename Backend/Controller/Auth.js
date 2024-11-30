const bcrypt = require('bcrypt');

const User=require('../model/User');
const jwt=require('jsonwebtoken')
require('dotenv').config()

exports.signup=async(req,res)=>{
    try{
            const {name,email,password,dateOfbirth}=req.body;

            //checking user esxitsor not
            const existUser=await User.findOne({email});

            if(existUser){
                return res.status(400).json({
                    success:false,
                    message:'User already exists',
                })
            }
            //now password hashed

            let hashedPassword;
            try{
                hashedPassword=await bcrypt.hash(password,10);
            }
            catch(error){
                return res.status(500).json({
                    success:false,
                    message:"error in hasing pasword",
                })
            }

            //create in db
            const user=await User.create({
                name,email,password:hashedPassword,dateOfbirth
            })
            return res.status(200).json({
                success:true,
                message:"Successfully Signup",
            })
    }
    catch(error){
        console.log(error)
        return res.status(500).json({
            success:false,
            message:'user cannot be reqistered'
        })

    }
}


exports.login=async(req,res)=>{
    try{
            //data fetch
            const {email,password}=req.body;

            //validation for check it 
            if(!email || !password){
                return res.status(400).json({
                    success:false,
                    message:"please fill all the details"
                })
            }
            //check for registered
            var user= await User.findOne({email})

            //if not registered
            if(!user){
                return res.status(400).json({
                    success:false,
                    message:"user is not registered",
                });
            }

            const payload={email:user.email,id:user._id};

            if(await bcrypt.compare(password,user.password)){
                //paswrod match
                let token = jwt.sign(payload,process.env.JWT_SECRET,{
                    expiresIn:"1h",
                });

                user=user.toObject();
                user.token=token;
                user.password=undefined;
                const options={
                    expires:new Date(Date.now()+3 * 24 * 60 *  60* 1000),
                    httpOnly:true,

                }

                res.cookie("token",token,options).status(200).json({
                    success:true,
                    token,user,
                    message:"login successfully"
                })

            }else {
                return res.status(403).json({
                    success:false,
                    message:"password incorrect"
                })
            }

    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Login failure"
        })

    }
}