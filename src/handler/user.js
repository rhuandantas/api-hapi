const encrypt = require("../services/encrypt");
const Boom = require("@hapi/boom");
const auth = require("../services/auth");
const db = require("./../database/connection");
const uuidv4 = require('uuid/v4');
const crypto = require('crypto');
const { sendMail } = require('./../services/mailer');
const { props } = require('./../config/index');

module.exports = {
    async signin(request, h) {
        try {
            const { email, password } = request.payload;
            const user = await db('users')
                .select('id', 'name', 'email', 'token', 'password')
                .where('email', email).first();
            if (user) {
                const isValid = encrypt.validPassword(password, user.password);
                if (isValid) {
                    token = await auth.generateAuthToken(user.email);
                    user.token = `Bearer ${token}`;
                    await db('users')
                        .where('id', user.id)
                        .update({ last_login: Date.now(), token: user.token })
                    user.token = undefined;
                    user.password = undefined;
                    return h
                        .response(user)
                        .header("Authentication", `Bearer ${token}`)
                        .code(200);
                }
            }

            return Boom.unauthorized("Usuário e/ou senha inválidos");
        } catch (err) {
            console.log(err.message);
            return Boom.internal(err.message);
        }
    },

    async signup(request, h) {
        try {
            const { name, email, password } = request.payload;
            let pass = encrypt.generateHash(password);
            const id = uuidv4();
            const user = await db('users').insert({
                id, name, email, password: pass
            })
            user.password = undefined;
            return h
                .response(user)
                .code(201);
        } catch (err) {
            console.log(err.message);
            return h.response({ mensagem: err.message }).code(500);
        }
    },

    async search(request, h) {
        try {
            var token = request.headers.authentication.replace('Bearer ', '');
            if (!token) return h.response({ mensagem: "Não autorizado" }).code(401);

            await auth.verify(h, token);

            const user = await db('users')
                .where('id', request.params.id)
                .select('id', 'name', 'email', 'last_login')
                .first();

            if (!user) {
                return h.response({ mensagem: "Usuário não encontrado." }).code(401);
            }
            user.token = undefined;
            user.password = undefined;
            return h
                .response(user)
                .code(200);
        } catch (err) {
            if (err.message === "jwt expired")
                return h.response({ mensagem: "Sessão inválida" }).code(401);
            return h.response({ mensagem: err.message }).code(500);
        }
    },

    async getAll(request, h) {
        try {
            const users = await db('users')
                .select('id', 'name', 'email', 'last_login');
            return h.response(users).code(200);
        } catch (err) {
            console.log(err.message);
            return h.response({ mensagem: err.message }).code(500);
        }
    },

    async forgotPassword(request, h) {
        try {
            const { email } = request.payload;
            const user = await db('users')
                .where('email', email)
                .select('*')
                .first();
            if (!user) return h.response("User not found").code(400);

            const code = crypto.randomBytes(4).toString('HEX');

            const dataExpires = new Date().getTime() + parseInt(props.passwordResetExpires);
            await db('users')
                .where('id', user.id)
                .update({
                    passwordResetToken: code,
                    passwordResetExpires: dataExpires
                });

            sendMail(user.email, code);

            return h.response('Recovery email was sent').code(200);
        } catch (error) {
            console.log(error);
        }
    },

    async changePassword(request, h) {
        try {
            const { email, code, newPassword } = request.payload;
            const user = await db('users')
                .where('email', email)
                .select('*')
                .first();

            if (!user) return h.response("User not found").code(400);

            if (Date.now() > user.passwordResetExpires)
                return h.response("Code reset expired. require new code").code(400);

            if (code !== user.passwordResetToken)
                return h.response("Password reset token is invalid").code(400);

            const password = encrypt.generateHash(newPassword);

            await db('users')
                .where('id', user.id)
                .update({ password: password });

            return h.response("Password changed successfully");

        } catch (error) {
            console.log(error);
            return h.response(error.message).code(500);
        }
    }
};
