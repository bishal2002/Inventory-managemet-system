const   express                            = require('express');
const   router                             = express.Router();

const {storeData,categoryData}             = require('../controller/InventoryController');

const fetchuser                            = require('../middleware/fetchusermiddleware');
const {adminGuard}                         = require('../middleware/perms');

router.get('/storedata/:id',fetchuser,adminGuard,storeData);
router.get('/categorydata/:id',fetchuser,adminGuard,categoryData);


module.exports=router;