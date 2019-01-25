var db = require('../db') ;
module.exports.displayProducts = (req,res) =>{
    var page = parseInt(req.query.page) || 1 ;
    var perPage = 8 ;
    var products = db.get('products').value().slice((page-1)*perPage,page*perPage) ;
    res.render('products/products.pug',{
        products : products ,
        pos : page.toString() 
    })
}
