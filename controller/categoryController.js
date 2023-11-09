const category = require('../models/category.model');
const product  = require('../models/product.model');


//Route-1  <--------------------  (Add category)  ------------------------------------->//
const addCategory = async(req,res)=>{
    try {
        const { category_name } = req.body;
        const Product = await product.findById(req.params.id);
        if (!Product) {
            return res.status(400).send({ error: 'Invalid product ID' });
        }
        if(!category_name){
            res.status(400).send("Please add a category");
        }
        const Category = await category.create({
            category_name,
            product_id:req.params.id
        })
        if(Category){
            res.status(200).json({Message:"category created Sucessfully",Status:true,payload:{Category,Product}});
        }else{
            res.status(400).send("Error in category creation");
        }
    } catch (error) {
        return res.status(500).send("Internal server Error");
    }
}

//Route-2  <------------------ (Get a category) ------------------------------------->//
const getCategory = async(req,res)=>{
    try {
        await category.findById(req.params.id)
        .populate("product_id")
        .then(data=>{
            res.json(data);
        })
    } catch (error) {
        return res.status(500).send({ error: 'Server error' });
    }
}

//Route-3 <----------------- (Delete Category) ---------------------------------------->//
const deleteCategory = async(req,res)=>{
    try {
        const data = await category.findByIdAndDelete(req.params.id);
        if(data){
            return res.status(200).json({Message:"Category Deleted Sucessfully",payload:data});
        }else{
            return res.status(400).send("Error in deletion of category");
        }
    } catch (error) {
        return res.status(500).send("Internal server Error");
    }
}

module.exports = {addCategory,getCategory,deleteCategory};
