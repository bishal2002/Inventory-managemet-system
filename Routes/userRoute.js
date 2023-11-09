const   express             = require('express');
const   router              = express.Router();
const   {
        registerUser, 
        loginUser, 
        getUser,
        updatePassword,
        forgetPassword,
        removeUser,
        refreshToken,
        createAdmin
        }                   = require('../controller/userController');

const   fetchUser           = require('../middleware/fetchusermiddleware');
const   {adminGuard}        = require('../middleware/perms');

//These 3 Routes For Admin-panel(Owner)


router.post('/createadmin',createAdmin);

router.post('/register/:id',adminGuard, registerUser);
router.delete('/removeuser',adminGuard, removeUser);
router.get('/getuser',adminGuard,getUser);

router.post('/refresh',refreshToken);

//These 3 Routes For user-panel(Staff)
router.post('/login/:id',loginUser);
router.put('/updatepassword',updatePassword);
router.post('/forgetpassword',fetchUser,forgetPassword);

module.exports = router;