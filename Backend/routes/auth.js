const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    obj = {
        a: 23,
        name : 'Rahul'
    }

    res.json(obj);
})

module.exports =  router;