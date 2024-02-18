const express = require('express');
const router = express.Router();
const authController =  require('../controllers/auth.controller');

//MIDDLEWARE
const auth = require('../middlewares/auth');

router.post('/register',authController.register);
router.post('/signin',authController.signIn); 
router.get('/isauth',auth(),authController.isauth);
router.post('/testrole',auth('createAny','test'),authController.testrole);


module.exports = router;