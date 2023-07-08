const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "Rahulismyname";

router.post(
  "/createUser",
  [
    check("email", "Email should be an email").isEmail(),
    check("name", "Name length should be 3 to 20 characters").isLength({
      min: 3,
      max: 20,
    }),
    check("password", "Password length should be 8 to 10 characters").isLength({
      min: 8,
      max: 10,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }
    else {
      try {
        //check whether the user with this email already exist
        let user = await User.findOne({ email: req.body.email });
        if (user) {
          return res.status(400).json({ error: "User with this email already exist" });
        }
        let salt = await bcrypt.genSaltSync(10);
        let secPass = bcrypt.hashSync(req.body.password, salt);
        user = await User.create({
          name: req.body.name,
          email: req.body.email,
          password: secPass,
        });

        const data = {
          user: {
            id: user.id,
          },
        };

        const authToken = jwt.sign(data, JWT_SECRET);
        console.log(authToken);
        // .then(user => res.json(user))
        // .catch(err => {
        //     console.log(err);
        //     res.json({error : 'Please enter an unique value' })
        // });

        res.send("Successfully validated");
        res.json({ authToken });
      } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
      }
    }
  }
);

router.post(
  "/login",
  [
    check("email", "Email should be an email").isEmail(),
    check("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }
    else{
        const {email, password} = req.body;
        try{
            let user = await User.findOne({ email});
            if (!user) {
                return res.status(400).json({ error: "Incorrect Credentials! Please try again" });
            }

            let passwordCompare = await bcrypt.compare(password, user.password);
            if(!passwordCompare){
                return res.status(400).json({ error: "Incorrect Credentials! Please try again" }); 
            }

            const data = {
                user: {
                  id: user.id,
                },
            };
      
            const authToken = jwt.sign(data, JWT_SECRET);
            res.json({ authToken });

        }
        catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    }
  }
);

module.exports = router;
