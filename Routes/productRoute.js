const   express              = require('express');
const   router               = express.Router();
const   {
        createProduct,
        getallProduct,
        getProduct,
        deleteProduct,
        updateProduct
        }                    = require('../controller/productController');
const   parser               = require('../utils/cloudinary');
const   fetchuser            = require('../middleware/fetchusermiddleware');
//const   checkRole            = require('../middleware/Checkperm');
const {regionGaurd,adminGuard, storeGuard} = require('../middleware/perms');

router.post('/createproduct',parser.single("image"),fetchuser,regionGaurd,adminGuard, storeGuard,createProduct);
router.get('/getproducts',fetchuser,regionGaurd,adminGuard, storeGuard,getallProduct);
router.delete('/deleteproduct/:id',fetchuser,regionGaurd,adminGuard, storeGuard,deleteProduct);
router.put('/updateproduct/:id',fetchuser,regionGaurd,adminGuard, storeGuard,updateProduct);
router.get('/:id',fetchuser,regionGaurd,adminGuard, storeGuard,getProduct);

module.exports = router;

