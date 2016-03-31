var _ = require("underscore");
var config = require('../config')();
module.exports = {
    name: "base",
    extend: function (child) {
        return _.extend({}, this, child);
    },
    run: function (req, res, next) {

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
    library: require('../library/')
}