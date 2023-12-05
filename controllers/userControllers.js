const mongoose = require('mongoose')
const User = require("../models/userModel");
const bcrypt = require('bcryptjs');
const generateTokenAndSetCookie = require('../utils/helpers/generateTokens.js');
const jwt = require('jsonwebtoken');


const getProfile = async(req,res)=>{
    const {username} = req.params;
    try {
        let user;
        user = await User.findOne({username}).select("-password").select("-updatedAt");
        if(!user) return res.status(404).json({error : "User not found"});
        
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({error:"error occured in getProfile"});
        console.log("error occured" , error.message);
    }
}

const signup = async (req,res)=>{
    try {
        const {name , username , email , password } = req.body;
        const user = await User.findOne({$or : [{email} , {username}]})
        if(user){
            return res.status(400).json({error : "user already exists" });
        }
        const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const newUser = new User({
			name,
			email,
			username,
			password: hashedPassword,
		});
		await newUser.save();

		if (newUser) {
			generateTokenAndSetCookie(newUser._id, res);

			res.status(201).json({
				_id: newUser._id,
				name: newUser.name,
				email: newUser.email,
				username: newUser.username,
				bio: newUser.bio,
				profilePic: newUser.profilePic,
			});
		} else {
			res.status(400).json({ error: "Invalid user data" });
		}
    } catch (error) {
        res.status(500).json({ error: error.message });
		console.log("Error in signupUser: ", error.message);
    }
}

const login = async (req,res) =>{
    try {
    const {username , password } = req.body;
    const user = await User.findOne({username})
    const isPasswordCorrect = await bcrypt.compare(password , user?.password || "");
        if(!user || !isPasswordCorrect) return res.status(500).json({error:"Invalid username or password"});
        generateTokenAndSetCookie(user._id,res);

        res.status(201).json({
            message : "login successful",
            user
        });
    } catch (error) {
        res.status(500).json({error : "error in userLogin"});
        console.log("Error in userLogin " , error.message);
    }
    
}

const logout = async (req,res) =>{
        try {
            res.cookie("jwt" , " ",{maxAge : 1});
            res.status(200).json({message:"user logged out successfully"});
        } catch (error) {
            res.status(500).json({error : error.message})
            console.log("Error occured " , error.message);
        }
    
}

const addEmail = async (req,res)=>{
    const {username} = req.params;
    const {email} =  req.body;
    try {
        let user = await User.findOne({username});
        user.contactEmails = [email , ...user.contactEmails]
        user = await user.save();
        res.status(200).json({message : "User profile updated" , user}); 
    } catch (error) {
        res.status(500).json({error : error.message})
        console.log("Error occured " , error.message);
    }
}


module.exports = {signup, login , logout , getProfile , addEmail}