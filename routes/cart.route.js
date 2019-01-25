var express = require('express') ; 
var route = express.Router()  ; 
var controller = require('../controllers/cart.controller') ; 


route.get('/add/:productId',controller.addToCart);
module.exports = route ; 