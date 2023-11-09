const   express                            = require('express');
const   router                             = express.Router();
const   {
        addCategory,
        getCategory,
        deleteCategory
        }                                  = require('../controller/categoryController');

const fetchuser                            = require('../middleware/fetchusermiddleware');

const {regionGaurd,adminGuard,storeGuard}  = require('../middleware/perms');

router.post('/addcategory/:id',fetchuser,regionGaurd,adminGuard,storeGuard,addCategory);
router.get('/getcategory/:id',fetchuser,regionGaurd,adminGuard,storeGuard,getCategory);
router.delete('/deletecategory/:id',fetchuser,regionGaurd,adminGuard,storeGuard,deleteCategory);



module.exports = router;
