const express      = require('express');
const Router       = express.Router();
const   { 
        addRegion,
        getallRegion,
        getRegion,
        deleteRegion,
        updateRegion 
        }          = require('../controller/regionController');
const  fetchuser    = require('../middleware/fetchusermiddleware');
const {regionGaurd,adminGuard,storeGuard} = require('../middleware/perms');

Router.post('/addregion',fetchuser,regionGaurd,addRegion);
Router.get('/getregions',fetchuser,regionGaurd,adminGuard,storeGuard,getallRegion);
Router.get('/getregion/:id',fetchuser,regionGaurd,adminGuard,storeGuard,getRegion);
Router.delete('/deleteregion/:id',fetchuser,regionGaurd,adminGuard,storeGuard,deleteRegion);
Router.put('/updateregion/:id',fetchuser,regionGaurd,adminGuard,storeGuard,updateRegion);




module.exports = Router;
