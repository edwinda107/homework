var express = require('express') ; 
var router = express.Router() ; 
var controller = require('../controllers/products.controller') ;
var authMiddleware = require('../middlewares/auth.middleware') ; 
var sessionMiddleware = require('../middlewares/session.middleware') ; 

router.get('/',sessionMiddleware,controller.displayProducts) ;
module.exports = router ; 