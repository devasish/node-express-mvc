var BaseController = require("./Base"),
        model = new (require("../models/ProductModel"));

module.exports = BaseController.extend({
    name : "Product",
    content: null,
    run: function(req, res, next) {
        model.setDB(req.db);
        model.getList(function(data) {
            res.send(data);
        }, {});
    },
    getContent: function(callback) {
        
    }
});