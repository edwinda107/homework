require('dotenv').config() ;
var express = require('express') ;
var app = express() ;
var bodyParser = require('body-parser') ;
var port = 8080 ;
var cookieParser = require('cookie-parser') ;
var md5 = require('md5') ;
////////////////////////////////////////////////////
var usersRoute = require('./routes/users.route') ;
var authRoute = require('./routes/auth.route') ;
var productsRoute = require('./routes/products.route') ;
var cartRoute = require('./routes/cart.route') ;
var transferRoute = require('./routes/transfer.route') ;
app.use(express.static('public')) ;
////////////////////////////////////////////////////
var authMiddleware = require('./middlewares/auth.middleware') ;
var sessionMiddleware = require('./middlewares/session.middleware') ;
////////////////////////////////////////////////////

function config(){
    app.set('view engine', 'pug') ;
    app.set('views' , './views') ;
    app.use(bodyParser.json()) ;
    app.use(bodyParser.urlencoded({extended : true})) ;
    app.use(cookieParser(process.env.SESSION_SECRET));
    app.use('/users',usersRoute) ;
    app.use('/auth',authRoute) ;
    app.use('/cart',cartRoute) ;
    app.use('/product',productsRoute) ;
    app.use('/transfer',transferRoute) ;
    app.use(sessionMiddleware) ;
}

config() ;
app.get('/',authMiddleware.requireAuth,(request,response) => {
    response.render('index.pug',{
        name :'QuocHung'
    }) ;
}) ;


app.listen(port,() => console.log('App listen on ' + port + '!')) ;
