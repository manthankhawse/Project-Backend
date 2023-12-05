const User = require("../models/userModel")
const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");


const postTemp = async (req,res)=>{
    try {
        const {userId} = req.params;
        const {val} = req.body;
        let user = await User.findOne({_id : userId }).select("-password").select("-updatedAt");
        var date = new Date()
        var currentOffset = date.getTimezoneOffset();
        var ISTOffset = 330;
        var ISTTime = new Date(date.getTime() + (ISTOffset + currentOffset)*60000);
        var hours = ISTTime.getHours()
        var minutes = ISTTime.getMinutes()
        var day = ISTTime.getDate()
        var month = ISTTime.getMonth()
        var year = ISTTime.getFullYear()
        let timeStamp = {
            date : {
                day ,
                month ,
                year
            },
            time :{
                hours,
                minutes
            }
        }
        if(val>38){
            remark = "High"
        }else{
            remark = "Normal"
        }
        let tempVals = user.temperature;
        user.temperature = [{val : val, timeStamp , remark}, ...tempVals];
        console.log(val);
        user = await user.save();
        res.status(200).json({message : "User profile updated" , user});

    } catch (error) {
        res.status(500).json({error:"error occured in post temp"})
        console.log("error occured" , error.message);
    }
}

const postHeartRate = async (req,res)=>{
    try {
        // const {userId} = req.params;
        // const {data} = req.body;
        // let user = await User.findOne({_id : userId }).select("-password").select("-updatedAt");
        // let hrVal = user.heartRate;
        // user.heartRate = [data , ...hrVal];
        // user = await user.save();

        const {userId} = req.params;
        const {val} = req.body;
        let user = await User.findOne({_id : userId }).select("-password").select("-updatedAt");
        let hrVals = user.heartRate;
        var date = new Date()
        var currentOffset = date.getTimezoneOffset();
        var ISTOffset = 330;
        var ISTTime = new Date(date.getTime() + (ISTOffset + currentOffset)*60000);
        var hours = ISTTime.getHours()
        var minutes = ISTTime.getMinutes()
        var day = ISTTime.getDate()
        var month = ISTTime.getMonth()
        var year = ISTTime.getFullYear()
        let timeStamp = {
            date : {
                day ,
                month ,
                year
            },
            time :{
                hours,
                minutes
            }
        }
        if(val>100){
            remark = "high"
        }else{
            remark = "Normal"
        }
        user.heartRate = [{val : val, timeStamp, remark}, ...hrVals];
        console.log(val);
        user = await user.save();

        res.status(200).json({message : "User profile updated" , user}); 
    } catch (error) {
        res.status(500).json({error:"error occured in updateProfile"})
        console.log("error occured" , error.message);
    }
}

const postOxy = async (req,res)=>{
    try {
        // const {userId} = req.params;
        // const {data} = req.body;
        // let user = await User.findOne({_id : userId }).select("-password").select("-updatedAt");
        // let oxyVal = user.oxygenLevel;
        // user.oxygenLevel = [data , ...oxyVal];
        // user = await user.save();

        const {userId} = req.params;
        const {val} = req.body;
        let user = await User.findOne({_id : userId }).select("-password").select("-updatedAt");
        var date = new Date()
        var currentOffset = date.getTimezoneOffset();
        var ISTOffset = 330;
        var ISTTime = new Date(date.getTime() + (ISTOffset + currentOffset)*60000);
        var hours = ISTTime.getHours()
        var minutes = ISTTime.getMinutes()
        var day = ISTTime.getDate()
        var month = ISTTime.getMonth()
        var year = ISTTime.getFullYear()
        let timeStamp = {
            date : {
                day ,
                month ,
                year
            },
            time :{
                hours,
                minutes
            }
        }

        if(val<95){
            remark = "Low"
        }else{
            remark = "Normal"
        }
        let oxyVals = user.oxygenLevel;
        user.oxygenLevel = [{val : val, timeStamp, remark}, ...oxyVals];
        console.log(val);
        user = await user.save();

        res.status(200).json({message : "User profile updated" , user}); 
    } catch (error) {
        res.status(500).json({error:"error occured in updateProfile"})
        console.log("error occured" , error.message);
    }
}

const postECG = async (req,res)=>{
    try {
        const {userId} = req.params;
        const {data} = req.body;
        let user = await User.findOne({_id : userId }).select("-password").select("-updatedAt");
        let ecgVal = user.ecg;
        user.ecg = [data , ...ecgVal];
        user = await user.save();
        res.status(200).json({message : "User profile updated" , user}); 
    } catch (error) {
        res.status(500).json({error:"error occured in updateProfile"})
        console.log("error occured" , error.message);
    }
}


module.exports = {postTemp,postHeartRate,postECG,postOxy};
