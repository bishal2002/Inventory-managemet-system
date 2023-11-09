const user                  = require('../models/user.model');
const bcrypt                = require('bcryptjs');
const jwt                   = require('jsonwebtoken');
const {randomBytes}         = require('crypto');
const sendMail              = require('../utils/nodemailer');

require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;
const REFRESH_TOKEN_SECRET= process.env.REFRESH_TOKEN_SECRET;

let RefreshTokens = [];


const createAdmin = async(req,res)=>{
    const {email,password,isAdmin} = req.body;
    let User = await user.findOne({ email: req.body.email });
    if (User) {
    return res.status(400).json({ error: "sorry one user is already exits with this user" });
    }
    if(!email || !password){
        return res.status(201).send("Please fill all the required field");
    }
    const Data = user.create({
        email,
        password,
        isAdmin
    })
    if(Data)
        return res.status(200).json({message:"User created successfully!"});
}

//ROUTE:1 <-----------------------  Register a user (By Admin)  -------------------------->//
const registerUser = async (req, res) =>
{
try {
        const { name, email} = req.body;
        const role= req.params.id;
        // Validation
                if (!name || !email ) {
                res.status(400);
                throw new Error("Please fill in all required fields");
        }
        let User = await user.findOne({ email: req.body.email });
        if (User) {
        return res.status(400).json({ error: "sorry one user is already exits with this user" });
        }
        const password = randomBytes(6).toString('hex');
        const salt = await bcrypt.genSalt(10);
        const secPassword = await bcrypt.hash(password,salt);
                const dbResponse = await user.create
                ({
                    email    : req.body.email,
                    name     : req.body.name,
                    role,
                    password : secPassword
                });
        sendMail(req.body.name, req.body.email , password ,'create');
        return res.status(200).send({Message : "mail sent sucessfully!"})
    }
        catch (error) {
        console.log(error.message);
        return res.status(500).send("Internal sever error");
    }
}

//Route-2 <--------------------- update password (Staff) ------------------------------------>//

const updatePassword = async (req,res)=>{
    try {
        const data      = req.body;
        const email     = data.email;
        const password  = data.password;
        const newPass   = data.newPassword;

        const doc = await user.findOne({email:email});
        if(!doc)
            return res.status(401).send({ message :'record not found!', status:'success' })
        
        const result = await bcrypt.compare(password, doc.password);

        if(!result)
            return res.status(401).send({ message:'invalid credentials!', status:'fail' })
        
        const salt = await bcrypt.genSalt(10);
        const genpassword = await bcrypt.hash(newPass,salt);
        const dbResponse = await user.findByIdAndUpdate(doc._id,{password : genpassword,accountStatus: true});
        if(dbResponse)
        {
            return res.status(201).send({ message : 'record updated successfully!', status: 'success' });
        }
        else
        {
            return res.status(400).send({ message : 'something went wrong!', status: 'fail' })
        }
    } catch (error) {
        return res.status(500).send({ error: error.message, message : 'Something went wrong', status: 'fail' });
    }
}


//ROUTE-3 <--------------------------- login User(Staff) -------------------------------------->//


const loginUser = async (req, res) =>
{
    //if there are errors return bad request and the errors.
    const { email, password } = req.body;
    try {
        const Data =await user.findById(req.params.id)
        .populate('role')
        //.populate('isAdmin');
        let User = await user.findOne({ email });
        if (!User) {
            return res.status(400).json({ error: "please try to login with correct credentials" });
        }
        const passwordcompare = bcrypt.compare(password, User.password);
        if (!passwordcompare) {
            return res.status(400).json({ error: "please try to login with correct credentials" });
        }
        const data = {
        user: 
        {
        id: User._id,
        role: Data.role.role_name//changed(User.role)
        //isAdmin:Data.isAdmin//changed
        }
    }   
        console.log(data);
        const accesstoken = jwt.sign(data, JWT_SECRET,{expiresIn:'15m'});
        const refreshtoken = jwt.sign(data,REFRESH_TOKEN_SECRET);
        RefreshTokens.push(refreshtoken);
        res.json({ accesstoken:accesstoken,refreshtoken:refreshtoken});
    }
    catch (err) {
        console.log(err.message);
        res.status(500).send("Internal sever error");
    }
}

//<-------------------- (Refresh-token) ------------------------------->//
const refreshToken = async(req,res)=>{
    const refreshToken = req.body.token;
    if(refreshToken == null)
    {
        return res.status(401)
    }
    if(!RefreshTokens.includes(refreshToken))
    {
        return res.sendStatus(403);
    }
    jwt.verify(refreshToken,REFRESH_TOKEN_SECRET,async(err,payload)=>{
        if(err){
            return res.sendStatus(403);
        }
        payload = {
            user: 
            {
            id: user._id
            }
        }
        const accesstoken = jwt.sign(payload, JWT_SECRET,{expiresIn:'15m'});
        const refreshtoken = jwt.sign(payload,REFRESH_TOKEN_SECRET,{expiresIn:'15d'});
        return res.json({accesstoken,refreshtoken});
    })
}
//ROUTE-4 <--------------------- Get user Detailes(Owner) ----------------------------------------->//

const getUser = async (req, res) => {
    try {
      // Check if the user is authorized
    if (req.user.role !== 'ADMIN') {
        return res.status(403).json({ msg: 'Not authorized' });
    }
     // Get all users from the database
    const users = await user.find().select('-password');
        return res.json(users);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Internal Server Error');
    }
};

//Route-5 <---------------------------- forget Password (Staff) -------------------------------------->//
const forgetPassword = async(req,res)=>{
        try {
            const filter        = { email : req.body.email }
            const dbResponse    = await user.findOne(filter)
            if(!dbResponse){
                return res.status(400).json({Message:"Record Not found!",status:"success"});
            }
            const ranPassword = randomBytes(6).toString('hex');
            const salt     = await bcrypt.genSalt(10);
            const password = await bcrypt.hash(ranPassword,salt);
            const newData  = {
                password:password,
                accountStatus:false
            }
            const response  = await user.updateOne({ email: req.body.email }, newData);
            if(response){
                sendMail( dbResponse.name, dbResponse.email, ranPassword, 'reset')
                return res.status(200).send({ message : 'An email has been sent to your email id!', status: 'success' });
            }
        } catch (error) {
            res.status(500).send("Internal sever error");
        }
}

//Route-6 <---------------------- Remove User(Admin) ------------------------------------------------->//

const removeUser = async(req,res)=>{
    try {
        if (req.user.role !== 'ADMIN') {
            return res.status(403).json({ msg: 'Not authorized' });
        }
        const data = req.body.email;
        const response = await user.remove({email:data});
        if(response){
            return res.status(200).send({ message :'Staff record deleted!', status:'success' });
        }
        else{
            return res.status(400).send({ message :'Staff record not deleted!', status:'fail' })
        }
    } catch (error) {
            return res.status(500).send({ error: error.message, message : 'Something went wrong!', status: 'fail' });  
    }
}

module.exports = { 
    registerUser,
    updatePassword, 
    loginUser , 
    getUser,
    forgetPassword,
    removeUser,
    refreshToken,
    createAdmin
};