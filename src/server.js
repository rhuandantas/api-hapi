'use strict';

const Hapi = require('@hapi/hapi');
const routes = require('./routes');
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const HapiSwagger = require('hapi-swagger');
const Pack = require('./../package');
const laabr = require('laabr');

const init = async () => {
    const swaggerOptions = {
        info: {
            title: 'Hapi API Documentation',
            version: Pack.version,
        }
    };
    const server = Hapi.server({
        port: 3000,
    });

    server.route(routes);
    await server.register([
        Inert,
        Vision,
        {
            plugin: HapiSwagger,
            options: swaggerOptions
        },
        {
            plugin: laabr,
            options: {},
        }
    ]);
    return server;
};
process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

module.exports = init;