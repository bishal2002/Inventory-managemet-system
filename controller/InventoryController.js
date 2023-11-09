const store     = require('../models/stores.model');
const category  = require('../models/category.model');

    const storeData = async(req,res)=>{
        try {
        await store.findById(req.params.id)
        .populate("category_id").select('-_id').select('-__v')
        .then(data=>{
            res.json(data);
        })
    } catch (error) {
        return res.status(500).send({ error: 'Server error' });
        }
    }

    const categoryData = async(req,res)=>{
        try {
            await category.findById(req.params.id)
            .populate("product_id").select('-_id').select('-__v')
            .then(data=>{
                res.json(data);
            })
        } catch (error) {
            return res.status(500).send({ error: 'Server error' });
            }
    }

    // const mergeData = async(req,res)=> {
    //     try {
    //     const {store_id,category_id} = req.params.id;
    //     const response1 = await axios.get(`http://localhost:5000/api/v7/storedata/${store_id}`);
    //     const response2 = await axios.get(`http://localhost:5000/api/v7/categorydata/${category_id}`);
    //     const data1 = response1.data;
    //     const data2 = response2.data;
    //     console.log(data1);
    //     const mergedData = { ...data1, ...data2 }; // Merge objects

    //     return res.status(200).json(mergedData);
    //         } catch (error) {
    //     return res.status(500).send("Internal server Error");
    //     }
    // }

module.exports = {storeData,categoryData}