const salesHistory = require('../models/order.model');


//Route-1 <--------------------- add saleshistory ----------------------------------------->//
const addsaleHistory= async(req,res)=>{
    try {
        const { productId,item_name,category,quantity,totalPrice } = req.body;
        if( !productId ||!item_name ||!category ||!quantity || !totalPrice ){
            res.status(400)
            throw new Error ("Please fill in all this fields");
        }
        const SalesHistory = await salesHistory.create({
            store_id:req.params.id,
            productId,
            item_name,
            category,
            quantity,
            totalPrice
        });
        if(SalesHistory){
            res.status(200).send("sales History created Succesfully");
        }
        else{
            throw new Error("Error in createing sales-History");
        }
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
}


//Route-2 <--------------------- Getsaleshistory(By store id) ------------------------------->//
const getsalesHistory = async(req,res)=>{
    try {
    await salesHistory.findById(req.params.id)
    .populate("store_id").select('-_id').select('-__v')
    .then(data=>{
        res.json(data);
    })
    } catch (error) {
        return res.status(500).send({ error: 'Server error' });
    }
}

//Route-3 <-------------------- Update sales history  --------------------------------------->//
const upadatesalesHistory = async(req,res)=>
{
        try {
            const Sales = await salesHistory.findByIdAndUpdate(req.params.id, req.body,{ new: true });
            if(!Sales){
                return res.status(400).json({Message:"Sales history not found"});
            }else{
                return res.status(200).json({Message:"Sales updated Sucessfully",payload:Sales});
            }
        } catch (error) {
            res.status(400).send({ error:error.message, message:'Something went wrong!', status: 'fail'});
        }
}

//Route-4 <-------------------- Delete sales history(By Date wise)  ------------------------->//

const deleteSalesHistoryByDate = async (req,res) => {
    try {
        const convertedStartDate = new Date(req.body.startDate)
        const convertedEndDate = new Date(req.body.endDate)
        const deletehistory = await salesHistory.deleteMany({
            "date": {
                "$gte":convertedStartDate,
                "$lte":convertedEndDate
            }
        })
        if(deletehistory){
            return res.status(200).json({Message:"Sales history Deleted Successfully",payload:deletehistory});
        }
        else{
            return res.status(400).send("Error deleting sales history data");
        }
    } catch (error) {
        return res.status(500).send("Internal Server Error");
    }
};



module.exports = {addsaleHistory,getsalesHistory,upadatesalesHistory,deleteSalesHistoryByDate};