var config = require('../config')();
module.exports = function (db) {
    this.db = db;
};
module.exports.prototype = {
    extend: function (properties) {
        var Child = module.exports;
        Child.prototype = module.exports.prototype;
        for (var key in properties) {
            Child.prototype[key] = properties[key];
        }
        return Child;
    },
    setDB: function (db) {
        this.db = db;
    },
    collection: function () {
        if (this._collection)
            return this._collection;
        return this._collection = this.db.collection('fastdelivery-content');
    },
    esClient: function () {
        if (this._esClient)
            return this._esClient;
        return this._esClient = this.db;
    },
    getConfig: function(key) {
        if (typeof(key) == "undefined" || key == "*" || key == "") {
            return JSON.parse(JSON.stringify(config));
        }
        var keys = key.split(".");
        var val  = "";
        var conf_tmp = JSON.parse(JSON.stringify(config));
        for (var x in keys) {
            val         = conf_tmp[keys[x]];
            conf_tmp    = val;
        }
        return val;
    },
    config : config,
    libray: require('../library/')
}