require('dotenv').config();

module.exports = {
    mail: {
        transporter: {
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,
            auth: {
                user: process.env.MAIL_AUTH_USER,
                pass: process.env.MAIL_AUTH_PASS
            }
        },
        from: process.env.MAIL_FROM
    },
    passwordResetExpires: process.env.PASSWORD_RESET_EXPIRES_TIME
}