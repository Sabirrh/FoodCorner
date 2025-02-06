// jshint esversion:6

const express = require("express");
const routers = express.Router();
const Users = require("../models/Users");
const { body, validationResult } = require('express-validator');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const jwtSecret = "writensomethingsrandomelywhichismeaninglessnothingbutthis#@#$"

// Middleware to parse request body
routers.use(express.json());
routers.use(express.urlencoded({ extended: true }));

// Route to create a user
routers.post("/createuser",
   body('email').isEmail().withMessage('Invalid email address'),
   body('name').notEmpty().withMessage('Name is required'),
   body('location').notEmpty().withMessage('Location is required'),
   body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long'),
   async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() });
      }

      const salt = await bcrypt.genSalt(10);
      let secPassword = await bcrypt.hash(req.body.password, salt);

      try {
         await Users.create({
            name: req.body.name,
            password: secPassword,
            email: req.body.email,
            location: req.body.location,
         });
         res.json({ success: true });
      } catch (error) {
         console.error(error);
         res.status(500).json({ success: false, error: 'Internal Server Error' });
      }
   }
);

// Route to login a user
routers.post('/loginuser',[
   body('email').isEmail().withMessage('Please enter your email'),
   body('password').isLength({ min: 5 }).withMessage('Enter your password')
], async (req, res) => {
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
   }
   let email = req.body.email
   try {
      let userData = await Users.findOne({ email });
      if (!userData) {
         return res.status(404).json({ errors: 'User not found' });
      }
      // const validPass = await userData.comparePassword(req.body.password);
      const validPass = await bcrypt.compare(req.body.password,userData.password);
      if (!validPass) {
         return res.status(400).json({ errors: 'Wrong password' });
      }
      const data = {
         user:{
            id: userData._id,
            
         }
      }
      const authtoken = jwt.sign(data,jwtSecret,{expiresIn:4});
      return res.json({ success: true,authtoken, userData });
   } catch (error) {
      console.log(error);
      res.json({ success: false, message: 'User not found' });
   }
 }
);
module.exports = routers;
