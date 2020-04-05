const jwt = require('jsonwebtoken');
require('dotenv/config');

exports.generateAuthToken = async function (userId) {
    //expiresIn:1800 = 30min
    return jwt.sign({ id: userId }, process.env.AUTH_SECRETE, { expiresIn: 1800 });
}

exports.verify = async function (res, token) {
    jwt.verify(token, process.env.AUTH_SECRETE, function (err, decoded) {
        console.log(err)
        if (err) return res.response('Não autorizado.').code(401);
    })
}