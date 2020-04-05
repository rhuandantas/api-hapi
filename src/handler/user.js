const encrypt = require("./../util/encrypt");
const Boom = require("@hapi/boom");
const auth = require("./../util/auth");
const db = require("./../database/connection");
const uuidv4 = require('uuid/v4');
module.exports = {
    async signin(request, h) {
        try {
            const { email, password } = request.payload;
            const user = await db('users').select('id', 'name', 'email', 'token', 'password').where('email', email).first();
            if (user) {
                const isValid = encrypt.validPassword(password, user.password);
                if (isValid) {
                    token = await auth.generateAuthToken(user.email);
                    user.token = `Bearer ${token}`;
                    db('users')
                        .where('id', user.id)
                        .update('last_login', Date.now())
                    user.token = undefined;
                    user.password = undefined;
                    return h
                        .response(user)
                        .header("Authentication", token)
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
                .response({
                    message: "User criado com sucesso",
                    data: user
                })
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
            const users = await db('users').select('id', 'name', 'email', 'last_login');
            return h.response(users).code(200);
        } catch (err) {
            console.log(err.message);
            return h.response({ mensagem: err.message }).code(500);
        }
    }
};
