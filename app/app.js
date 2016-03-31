/**
 * Module dependencies.
 */
var express = require('express'),
        http = require('http'),
        path = require('path'),
        config = require('./config')(),
        app = express(),
        ElasticSearch = require("elasticsearch"),
        errorhandler = require('errorhandler'),
        routes = require('./config/routes');
//        Admin = require('./controllers/Admin'),
//        Home = require('./controllers/Home'),
//        Blog = require('./controllers/Blog'),
//        Page = require('./controllers/Page')
//        Product = require('./controllers/Product');

var controllers         = routes.controllers();
var controllerObjects   = {};
for (var x in controllers) {
    controllerObjects[controllers[x]] = require('./controllers/' + controllers[x]);
}

// development only
if ('development' == app.get('env')) {
    app.use(errorhandler());
}

var attachDB = function (req, res, next) {
    var client = new ElasticSearch.Client({
        host: config.es.host + ':' + config.es.port
    });

    req.db = client;
    next();
};

for (var x in routes.routes) {
    app[routes.routes[x].request](routes.routes[x].path, attachDB, function(req, res, next) {
        if (typeof(routes.routes[x].callback) != 'function') {
            controllerObjects[routes.routes[x].controller][routes.routes[x].method](req, res, next);
        } else {
            routes.routes[x].callback(controllerObjects, req, res, next);
        }
    });
}

//app.all('/admin*', attachDB, function (req, res, next) {
//    Admin.run(req, res, next);
//});
//app.all('/blog/:id', attachDB, function (req, res, next) {
//    Blog.runArticle(req, res, next);
//});
//app.all('/blog', attachDB, function (req, res, next) {
//    Blog.run(req, res, next);
//});
//app.all('/services', attachDB, function (req, res, next) {
//    Page.run('services', req, res, next);
//});
//app.all('/careers', attachDB, function (req, res, next) {
//    Page.run('careers', req, res, next);
//});
//app.all('/contacts', attachDB, function (req, res, next) {
//    Page.run('contacts', req, res, next);
//});
//app.all('/', attachDB, function (req, res, next) {
//    Home.run(req, res, next);
//});
//app.all('/products', attachDB, function(req, res, next) {
//    Product.run(req, res, next);
//})



http.createServer(app).listen(config.port, function () {
    console.log(
            '\nExpress server listening on port ' + config.port
            );
});
