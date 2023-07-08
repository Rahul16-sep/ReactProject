const jwt = require('jsonwebtoken');

const JWT_SECRET = "Rahulismyname";

const fetchuser = (req, res, next) => {
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({error: "Unauthorized User"});
    }
    try {
        const data = jwt.verify(token, JWT_SECRET)
        req.user = data.user;
        next(); 
    } catch (error) {
        console.log("Some error occurred")
        res.status(401).send({error: "Unauthorized User"});
    }
    
}

module.exports = fetchuser;