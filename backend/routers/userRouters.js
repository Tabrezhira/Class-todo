const express = require('express');
const router = express.Router();
const User = require('../models/userModels.js')
const jwt = require('jsonwebtoken')


//signup-createduser
//signin
//otp 
//password reset


router.post('/signup',async(req,res)=>{
    try {
            const {username,email,password,mobileno} = req.body
        
            if(!username || !email || !password || !mobileno){
                return res.status(400).json({message: 'All input required'})
            }
            const userAvailable = await User.findOne({email})
            if(userAvailable){
            return res.status(400).json({message: 'User is Already Available'})
            } 
            const newUser = new User({username,email,password,mobileno});
            await newUser.save();
            const payload = {
               id:newUser._id ,
               email
            };
            const token = jwt.sign(payload ,"Tabrez.447",{expiresIn: '1h'})
            res.status(201).json({message:"ok" , token : token})
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})

router.post('/signin',async(req,res)=>{
    try {
            const {email,password,token} = req.body
            if (!token && (!email || !password)) {
                return res.status(400).json({ message: 'Token, email, and password are required' });
            }

            if(token){
                const decoded = jwt.verify(token, "Tabrez.447");
                const user = await User.findOne({email:decoded.email});
                if(!user){
                    return res.status(400).json({message: 'User is not Available plz check email and password again'})
                }
                if(password !== user.password){
                    return res.status(400).json({message: 'plz check email and password again'})
                }
                return res.status(202).json(user)
            }

            const user = await User.findOne({email});
                    
            if(!user){
                return res.status(400).json({message: 'User is not Available plz check email and password again'})
            }
            if(password !== user.password){
                return res.status(400).json({message: 'plz check email and password again'})
            }

            res.status(201).json(user)
    } catch (error) {
        res.status(500).json(error)
    }
})

router.patch('/reset',async(req,res)=>{
    try {
            const{email} = req.body
        
            if(!email){
                return res.status(400).json({message: 'All input required'})
            }
            const user = await User.findOne({email});
        
            if(!user){
                return res.status(400).json({message: 'User is not Available plz check email and password again'})
            }
            const randomNumber = Math.floor(1000 + Math.random() * 9000);
        
            user.otp = randomNumber,
            await user.save();
        
            res.status(201).json(user)
    } catch (error) {
        res.status(500).json(error)
    }

})


router.put("/newpassword/:id", async(req,res)=>{
try {
        const userId = req.params.id
        const{otp,password} = req.body
    
        if(!otp || !password ){
            return res.status(400).json({message: 'All input required'})
        }
        const user = await User.findById(userId);
    
        if(user.otp !==  Number(otp)){
            return res.status(400).json({message: 'Wrong OTP'})
        }
        
        user.password = password;
        user.otp = null
        
        await user.save()
    
        res.status(201).json({message:'Password is updated successfully'})
} catch (error) {
    res.status(500).json(error) 
}


})




module.exports = router;