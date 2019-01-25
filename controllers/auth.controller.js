var db = require('../db') ; 
var bodyParser = require('body-parser') ; 
var md5 = require('md5') ; 
module.exports.login = function(req,res){
    res.render('auth/login') ; 
}
module.exports.postLogin = function(req,res){
    var email = req.body.email ; 
    var user = db.get('users').find({email : email}).value() ;
    if (!user){
        console.log(user) ; 
        res.render('auth/login.pug',{
            errors: ['Email does not exist'],
            values : req.body 
        });
        return ; 
    } 
    var password = req.body.password ;
    var hashedpassword = md5(password) ; 
    if (!(user.password === hashedpassword)){
        res.render('auth/login.pug',{
            errors : ['Wrong password'], 
            values : req.body  
        }) ; 
        return ; 
    } 
    res.cookie('userId',user.id,{
        signed : true 
    }) ; 
    res.redirect('/users') ; 
}
 