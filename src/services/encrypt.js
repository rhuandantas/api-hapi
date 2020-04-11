const bcrypt = require("bcrypt");

exports.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};


exports.validPassword = function (passed, existing) {
    return bcrypt.compareSync(passed, existing);
};