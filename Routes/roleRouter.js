const   express                            = require('express');
const   router                             = express.Router();

const  {addRole,deleteRole, fetchRole}     = require('../controller/roleController');

const {adminGuard}                           = require('../middleware/perms');

router.post('/addrole',adminGuard,addRole);
router.delete('/deleterole/:id',adminGuard,deleteRole);
router.get('/fetchrole/:id',adminGuard,fetchRole);

module.exports=router;



