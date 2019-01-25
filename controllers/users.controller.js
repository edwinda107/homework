var db = require('../db') ; 
var shortid = require('shortid');
var md5 = require('md5') ;
module.exports.index = function(req,res){
    res.render('users/index.pug',{
        users : db.get('users').value()
    }) ;    
}
module.exports.search = (req,res) => {
    var q = req.query.q ; 
    /*var match = users.filter((element) =>{
        return element.name.toLowerCase().indexOf(q.toLowerCase()) !== -1 ; 
    })*/
    var match = db.get('users').value().filter((element) =>{
        return element.name.toLowerCase().indexOf(q.toLowerCase()) !== -1 ; 
    })
    //console.log(req.query) ; 
    res.render('users/index.pug',{
        users : match 
    })
}
module.exports.create = (req,res) =>{
    res.render('users/create.pug') ; 
}
module.exports.get =  (req,res) =>{
    var id =  req.params.id ;
    var temp = db.get('users').find({id: id}).value() ;
    res.render('users/view.pug',{
        user : temp
    }) ; 
}
module.exports.postCreate = (req,res) =>{
    
    req.body.id = shortid.generate(); 
    req.body.email = req.body.name ; 
    req.body.password = md5(req.body.password) ;
    req.body.avatar = req.file.path.split('\\').splice(1).join('/');
    db.get('users').push(req.body).write() ; 
    res.redirect('/users') ; 
}