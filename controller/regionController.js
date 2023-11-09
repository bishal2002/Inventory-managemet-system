const region = require('../models/region.model');

//Route:1 <----------------  (Add a Region ) ---------------------------------------->// 
const addRegion = async(req,res)=>{
    try {
        const { region_name,state,city }= req.body;
        if(!region_name || !state || !city){
            return res.status(400).send("Please enter all the required Field");
        }
        const Region = await region.create({
            region_name,
            state,
            city
        });
        return res.status(200).json({Message:"Region added sucessfully",status:true,payload:Region});
    } catch (error) {
        return res.status(500).send("Internal Server Error");
    }
}

//Route:2 <----------------- ( Get allRegions  ) ------------------------------------>//
const getallRegion = async(req,res)=>{
    try {
        const Region = await region.find();
        if(!Region){
            return res.status(400).send("Regions not found");
        }
        else{
            return res.status(200).json({Status:true,payload:Region});
        }
    } catch (error) {
        return res.status(500).send("Internal Server Error");
    }
}


//Route:3 <----------------- (Get the Region (By id)) -------------------------------->//
const  getRegion = async(req,res)=>{
    try {
        const Region = await region.findById(req.params.id);
        if(!Region){
            return res.status(400).send("Region not found");
        }else{
            return res.status(200).json({Status:true,payload:Region});
        }
    } catch (error) {
        return res.status(500).send("Internal Server Error");
    }
}

//Route:4 <----------------- (Delete a Region)  --------------------------------------->//

const deleteRegion = async (req,res)=>{
    try {
        const data = await region.findByIdAndDelete(req.params.id);
        if(!data)
        {
            return res.Status(400).send("Region not Found!");
        }else{
            return res.status(200).json({Message:"Region Deleted sucessfully"});
        }
    
    } catch (error) {
        return res.status(500).send("Internal Server Error");
    }
}

//Route:5 <-------------------   ( Update a Region ) ------------------------------------>//

const updateRegion = async(req,res)=>{
    try {
        const data = await region.findByIdAndUpdate(req.params.id,req.body,{ new: true });
        if(data){
            return res.status(200).json({Message:"Region Updated Sucesfully",payload:data});
        }else{
            return res.status(400).send("Something went Wrong!");
        }
    } catch (error) {
        return res.status(500).send("Internal Server Error");
    }
}
module.exports = {addRegion,getallRegion,getRegion,deleteRegion,updateRegion};