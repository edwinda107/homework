var db = require('../db') ;
var shortId = require('shortid') ;
module.exports.create = function(req,res,next){
  res.render('transfer/create') ;
}
module.exports.postCreate = function(req,res,next){
  req.body.id = shortId.generate() ; 
  db.get('transfers').push(req.body).write() ;
  res.redirect('/transfer/create') ;
}
