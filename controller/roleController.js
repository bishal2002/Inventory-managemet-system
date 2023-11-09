const Role = require('../models/role.model');

const addRole = async(req,res)=>{
    try {
        const{role_name} = req.body;
        if(!role_name){
            return res.status(201).send("Please Enter a role name!");
        }
        const regionId= req.query.regionId
        const storeId = req.query.storeId
        const Data = await Role.create({
            role_name,
            regionId,
            storeId
        });
        if(Data){
            return res.status(200).json({Message:"Role Data added Suessfully!",payload:Data});
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal Server Error!");
    }
}

const deleteRole = async(req,res)=>{
    try {
        const data = await Role.findByIdAndDelete(req.params.id);
        if(data){
            return res.status(200).send("Role Deleted Successfully");
        }
            return res.status(201).send("Role already deleted!");
    } catch (error) {
        return res.status(500).send({ error: 'Server error' }); 
    }
}

const fetchRole = async(req,res)=>{
    try {
        Role.findById(req.params.id)
        .populate('regionId')
        .then(data=>{
            res.json(data);
        })
    } catch (error) {
        return res.status(500).send({ error: 'Server error' }); 
    }
}

module.exports = {addRole,deleteRole,fetchRole};