const express = require('express');
const router = express.Router();

const User = require('../models/User')

const {check, validationResult} = require('express-validator');

router.post('/', [
    check('email', 'Email should be an email')
                    .isEmail(),
    check('name', 'Name length should be 3 to 20 characters')
                    .isLength({ min: 3, max: 20 }),
    check('password', 'Password length should be 8 to 10 characters')
                    .isLength({ min: 8, max: 10 })
],
(req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({errors : errors.array() });
    }
 
    // If no error occurs, then this
    // block of code will run
    else {
        res.send("Successfully validated")
        User.create({
            name : req.body.name,
            email : req.body.email,
            password : req.body.password
        }).then(user => res.json(user))
        .catch(err => {
            console.log(err);
            res.json({error : 'Please enter an unique value' })
        });
    }
})

module.exports =  router;