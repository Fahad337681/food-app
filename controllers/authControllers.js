const express = require("express");
const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const JWT= require('jsonwebtoken');

//REGISTER
const registerController = async (req, res) => {
  try {
    const { username, email, password, address, phone,answer } = req.body;
    //validation(checks lagaty hai yahaaaa)
    if (!username || !email || !password || !address || !phone ) {
      return res.status(500).send({
        success: false,
        message: "Please provide All Fields",
      });
    }

    //check user(pehly sy account tu nhi bana?)
    const existing = await userModel.findOne({ email });
    if (existing) {
      return res.status(500).send({
        success: false,
        message: "Email Already Registered,Please Login",
      });
    }
    //password hashing
    var salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //new user Account creation will process here
    const user = await userModel.create({
      username,
      email,
      password:hashedPassword,
      address,
      phone,
    });
    res.status(201).send({
      success: true,
      message: "Successfully Registered",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(200).send({
      success: false,
      message: "Error in Register API",
      error,
    });
  }
};

//LOGIN

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //Validations
    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "Please Provide Email or Password",
      });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).send({
        success: false,
        message: "User Not Found,Register First", 
      });
    }

    //User Password Checking 
    const isMatch= await bcrypt.compare(password,user.password);
    if(!isMatch){
      return res.status(500).send({
        success:false,
        message:'Invalid Credentials'
      })
    }
    const token=JWT.sign({id:user._id},process.env.JWT_SECRET,{
      expiresIn:"7d",
    });
    user.password=undefined;
    res.status(200).send({ 
      success: true,
      message: "Login Successful",
      token,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Login Api failed",
      error,
    });
  }
};



module.exports = { registerController, loginController};
