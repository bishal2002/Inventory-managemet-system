const jwt         = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;


const fetchuser=(req,res,next)=>
{
    //get the user from the jwt token and add id to req obj.
    const token=req.get('Authorization').split(" ")[1];
    if(!token)
    {
        res.status(403).json({error:"please authanticate using a valid token"});
    }
    try {
        const decodeToken = jwt.verify(token,JWT_SECRET);
        req.user = decodeToken.user;
        next();
    } catch (error) {
        res.status(401).json({error:"please authanticate using a valid token"});
    }
}

module.exports=fetchuser;
