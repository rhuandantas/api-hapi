'use strict';

const Hapi = require('@hapi/hapi');
const routes = require('./src/routes');
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const HapiSwagger = require('hapi-swagger');
const Pack = require('./package');

const init = async () => {
    const swaggerOptions = {
        info: {
            title: 'Books API Documentation',
            version: '0.0.1',
        }
    };
    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    server.route(routes);
    await server.register([
        Inert,
        Vision,
        {
            plugin: HapiSwagger,
            options: swaggerOptions
        }
    ]);
    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();