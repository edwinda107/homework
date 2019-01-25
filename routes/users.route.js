var express = require('express') ;
var multer = require('multer')  ; 
var router = express.Router() ; 
////////////////////////////////////////////////////
var db = require('../db') ; 
var controller = require('../controllers/users.controller') ; 
var validate = require('../validate/users.validate') ;
var authMiddleware = require('../middlewares/auth.middleware') ;  


var upload = multer({ dest: './public/uploads/' })
////////////////////////////////////////////////////

router.get('/',authMiddleware.requireAuth,controller.index);
router.get('/search',controller.search);
router.get('/create',controller.create);
router.post('/create',upload.single('avatar'), validate.postCreate, controller.postCreate);
router.get('/:id',controller.get);


module.exports = router ; 