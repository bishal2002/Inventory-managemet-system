const mongoose   = require('mongoose');
const { Schema } = mongoose;
const validator  = require('validator');

const userSchema = new Schema({
    name : {
        type : String,
        require : [true,"Please enter  a name"],
        minLength:[4,"Please enter a name minimum 4 character"],
        maxLength:[25,"Please enter a name maximum 25 character"],
    },
    email : {
        type : String,
        require : [true,"Please enter a E-mail"],
        unique:true,
        validate:[validator.isEmail,"Please enter a valid E-mail"]
    },
    password:{
        type:String,
        required:[true,"please enter a password"],
        minLength:[6,"Please enter minimum 6 digit length"]
    },
    role:{
        type:  mongoose.Schema.Types.ObjectId,
        ref: 'Role',
        //required: true
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    accountStatus:{
        type :Boolean,
        default :false
    },
},
{
    timestamps: true
});

module.exports = mongoose.model('User',userSchema);

    // role:{
    //     type:String,
    //     enum:['ADMIN', 'STORE_MANAGER', 'REGIONAL_MANAGER', 'STAFF'],
    //     required : true 
    // },