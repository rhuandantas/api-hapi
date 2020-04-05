const knex = require('knex');
const config = require('./../../knexfile')[process.env.NODE_ENV || 'development'];

const connection = knex(config);

module.exports = connection;