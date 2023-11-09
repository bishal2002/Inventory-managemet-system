const   express             = require('express');
const   Router              = express.Router();
const   fetchuser           = require('../middleware/fetchusermiddleware');

const   {
        addStore,
        fetchStore,
        deleteStore,
        getallStores,
        updateStore
        }                   = require('../controller/storeController');
const { regionGaurd,adminGuard,storeGuard } = require('../middleware/perms');

Router.post('/addstore/:id',fetchuser,regionGaurd,adminGuard,storeGuard,addStore);
Router.get('/fetchStore/:id',fetchuser,regionGaurd,adminGuard,storeGuard,fetchStore);
Router.delete('/deleteStore/:id',fetchuser,regionGaurd,adminGuard,storeGuard,deleteStore);
Router.get('/fetchallstores',fetchuser,regionGaurd,adminGuard,storeGuard,getallStores);
Router.put('/updatestore/:id',fetchuser,regionGaurd,adminGuard,storeGuard,updateStore);

module.exports = Router;