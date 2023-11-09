const product                 = require('../models/product.model');

//(Route-1)<----------- create a product (Add product) ------------->//

const createProduct = async (req,res)=>{
    try {
    // const Category = await category.findById(req.params.id);
    const { item_name,item_id,brand,quantity,price,description } = req.body;
    //validation
    if( !item_name ||!brand ||!quantity || !price ||!description ){
    res.status(400)
    throw new Error ("Please fill in all this fields");
}
    const Product = await product.create({
    item_name,
    item_id,
    brand,
    quantity,
    price,
    description,
    image:req.file.path,
    });
    if(Product){
    return res.status(200).json({Message:"Product created Sucessfully",payload:{Product}});
    }else
    {
    log.error(message)
    res.status(400).send({ error:error.message, message:'Something went wrong!', status: 'fail'});
    }
}
catch (error) {
        res.status(500).json('Internal server error');
    }
}


//Route-2<-------------- Get all products(Dashboard) --------------->//

const getallProduct = async(req,res)=>{
    try {
        const Product = await product.find().sort("-createdAt");
        res.status(200).json(Product);
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
}

//Route-3 <-------------- Get single product ------------------------->//

const getProduct = async(req,res)=>{
    try {
        const Product = await product.findById(req.params.id);
        if(!Product){
            res.status(404)
            throw new Error({Message:"Product not Found!"}); 
        }
        res.status(200).json(Product);
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
}

//Route-4 <--------------- Delete a Product ---------------------------->//

const deleteProduct = async(req,res)=>{
    try {
        const Product = await product.findByIdAndDelete(req.params.id);
        if(!Product){
            res.status(400).json({message:"Product not found"});
        }
        else{
            res.status(200).json({message:"Product deleted Succesfully"});
        }
    }
        catch (error) {
        res.status(500).send("Internal Server Error");
    }
}

//Route-5 <--------------- Update a Product ---------------------------->//

    const updateProduct = async(req,res)=>{
    try {
        const Product = await product.findByIdAndUpdate(req.params.id, req.body,{ new: true });
        if(!Product){
            res.status(400).json({message:"Product not found"});
        }
        else{
            res.status(200).json({message:"Product Updated Succesfully",payload:Product});
        }
    }catch (error) {
        res.status(500).send("Internal Server Error");
    }
}

module.exports = {createProduct,getallProduct,getProduct,deleteProduct,updateProduct};