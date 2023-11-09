const storesModel = require("../models/stores.model");
const userModel = require("../models/user.model");


const adminGuard = async (req,res,next) =>{
    if(req.user.isAdmin) 
        return next();
    else 
        return res.status(403).send('Forbidden');
}

const regionGaurd = async (req,res,next)=>{
    if(req.user.isAdmin)
        return next();
    if(req.user.role == 'Regional Manager')
    {
        const userId = req.user.id;
        const user = await userModel.findOne({_id:userId}).populate('role');

        if(user.role.regionId == req.params.id)
            return next();
    }
    return res.status(403).send('Forbidden')
}

const storeGuard = async (req,res,next) =>{
    if(req.user.isAdmin) 
        return next();
    const userId = req.user.id;
    const storeId = req.params.id
    const user = await userModel.findOne({_id:userId}).populate('role')

    if(req.user.role == 'Store Manager'){
        const store = await storesModel.findOne({_id:storeId})

        if(user.role.regionId == store.regionid)
            return next();

    } else if (req.user.role == "Store Manager"){
        if(user.role.storeId == storeId) 
            return next();
    }
    return res.status(403).send('Forbidden');
}


module.exports = {regionGaurd,adminGuard,storeGuard};








// export const productGuard = async (req,res,next) =>{
//     if(req.user.role == 'Admin') return next();
//     const userId = req.user.id;
//     const productId = req.params.id
//     const user = await userModel.findOne({_id:userId}).populate('role')
//     const product = await productModel.findOne({_id:productId});

//     if(req.user.role == 'Regional Manager'){
//         const store = await storesModel.findOne({_id:storeId})

//         if(user.role.regionId == store.regionid) return next();

//     } else if (req.user.role == "Store Manager"){
//         if(user.role.storeId == storeId) return next();
//     }

//     return res.status(403).send('Forbidden')
// }

