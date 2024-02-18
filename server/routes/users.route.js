const express = require('express');
const router = express.Router();
const userController = require('../controllers/users.controller');
const auth = require('../middlewares/auth');
/////////////////////////////////////////
router.get('/profile',auth('readOwn','profile'),userController.profile);
router.patch('/profile',auth('updateOwn','profile'),userController.updateProfile); 
router.patch('/email',auth('updateOwn','profile'),userController.updateUserEmail);
router.get('/verify',userController.verifyAccount); 
 


/////////////////////////////////////////
module.exports = router;