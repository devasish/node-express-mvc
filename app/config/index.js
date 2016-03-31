var config = {
    env: 'local',
    local: {
        mode: 'local',
        port: 3000,
        mongo: {
            host: '127.0.0.1',
            port: 27017
        },
        es: {
            host: '192.168.5.63',
            port: 9200
        },
        indices : {
            main : "sspl_v8",
            analytic: "analytics"
        },
        types : {
            product : "product",
            brand : "brand",
            salt : "salt" 
        }
    },
    staging: {
        mode: 'staging',
        port: 4000,
        mongo: {
            host: '127.0.0.1',
            port: 27017
        },
        es: {
            host: '192.168.5.63',
            port: 9200
        },
        indices : {
            main : "sspl_v8",
            analytic: "analytics"
        },
        types : {
            product : "product",
            brand : "brand",
            salt : "salt" 
        }
    },
    production: {
        mode: 'production',
        port: 5000,
        mongo: {
            host: '127.0.0.1',
            port: 27017
        },
        es: {
            host: '192.168.5.63',
            port: 9200
        },
        indices : {
            main : "sspl_v8",
            analytic: "analytics"
        },
        types : {
            product : "product",
            brand : "brand",
            salt : "salt" 
        }
    }
}
module.exports = function (mode) {
    return config[mode || process.argv[2] || config.env] || config[config.env];
}