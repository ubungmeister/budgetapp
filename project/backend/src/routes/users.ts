import express from "express"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import {UserModel} from "../models/users"
import e from "express";
const router = express.Router();

router.post("/signup", async (req, res) => {
    const { username, password, email } = req.body;

  try {
    const existingUserWithEmail = await UserModel.findOne({ email });

    if (existingUserWithEmail) {
      return res.status(400).json({ message: "Email already exist" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({ username, email, password: hashedPassword });
    await newUser.save();

    res.json({ message: "User created" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }

})



router.post("/signin", async (req, res) => {
    const {email, password} = req.body;
    const existingUserWithEmail = await UserModel.findOne({email});

    if(!existingUserWithEmail){
        res.json({message: "Email or password is incorrect"})
    }
    
    const isPasswordCorrect = await bcrypt.compare(password, existingUserWithEmail.password);
    if(!isPasswordCorrect){
        res.json({message: "Email or password is incorrect"})
    }

    const token =  jwt.sign({email: existingUserWithEmail.email, id: existingUserWithEmail._id}, "test", {expiresIn: "1h"})
    res.json({userID:existingUserWithEmail._id, token})
})




export {router as usersRouter}