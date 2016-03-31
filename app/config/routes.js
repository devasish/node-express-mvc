var _routes = {
    controllers: function () {
        var arr = [];
        for (var x in this.routes) {
            if (arr.indexOf(this.routes[x].controller) == -1) {
                arr.push(this.routes[x].controller);
            }
        }
        return arr;
    },
    routes: [
        {
            path: "/products",
            request: "all",
            controller: "Product",
            method: "run",
//            callback: function (obj, req, res, next) {
//                obj["Product"].run(req, res, next);
//            }
        }
    ]
}

module.exports = _routes;