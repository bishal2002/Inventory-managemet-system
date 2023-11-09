const store                 = require('../models/stores.model');
const region                = require('../models/region.model');


const addStore = async(req, res) =>{
    try {
    const { store_name,category_id } = req.body;
    const Region = await region.findById(req.params.id);
    if (!Region) {
        return res.status(400).send({ error: 'Invalid region ID' });
    }
    const Store = await store.create({
        store_name,//query parameter
        regionid : req.params.id ,
        category_id
    });
    if(Store)
    {   
        return res.status(200).json({status:true,Message:"Store Data deleted Sucessfully",payload : { store_name,Region,category_id,}});
    } 
    } catch (err) {
        return res.status(500).send({ error: 'Server error' });
    }
}


//mongo aggregation useing populate!`
const fetchStore = async(req,res)=>{
    try {
    await store.findById(req.params.id)
    .populate("regionid").select('-_id').select('-__v')
    .then(data=>{
        res.json(data);
    })
} catch (error) {
    return res.status(500).send({ error: 'Server error' });
    }
}


const deleteStore = async(req,res)=>{
    try {
        const data = await store.findByIdAndDelete(req.params.id);
        if(data){
            return res.status(200).json({status:true,Message:"Store Data deleted Sucessfully"});
        }
        return res.status(400).json({status:false,Message:"Nothing to delete"});
    } catch (error) {
        console.log(error)
        return res.status(500).send({ error: 'Internal Server error' });  
    }
}

const getallStores = async(req,res)=>{
    try {
        const payload = await store.find();
        if(!payload)
        {
            return res.status(400).send("Unable to find stores data");
        }else{
            return res.status(200).json({payload:payload});
        }
    } catch (error) {
        return res.status(500).send({ error: 'Internal Server error' });
    }
}

const updateStore = async (req,res)=>{
    try {
        const response = await store.findByIdAndUpdate(req.params.id,req.body,{ new: true });
        if(response){
            return res.status(200).json({status:true,Message:"Store Data updated Suessfully",payload:response});
        }else{
            return res.status(400).send("Something went wrong!");
        }
    } catch (error) {
        return res.status(500).send({ error: 'Internal Server error' });
    }
}


module.exports = {addStore,fetchStore,deleteStore,getallStores,updateStore};
