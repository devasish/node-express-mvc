var Model = require("./Base"),
        model = new Model();

var ProductModel = model.extend({
    getList: function(callback, params) {
        this.esClient().search({
            index : 'sspl_v8',
            body : {
                query : {
                    query_string : {
                        default_field : "ProductName",
                        query : "*"
                    }
                }
            }
        }).then(callback);
    }
});
module.exports = ProductModel;