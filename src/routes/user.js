const joi = require('@hapi/joi');
const userHandler = require("./../handler/user");
const userSchema = require('./validation/userSchema');

module.exports = [
    {
        method: "POST",
        path: "/signin",
        config: {
            description: "logar um usuário",
            tags: ['api'],
            handler: userHandler.signin,
            validate: {
                payload: userSchema.signin.payload
            }
        }
    },

    {
        method: "POST",
        path: "/signup",
        config: {
            description: "cadastrar um usuário",
            notes: "teste",
            tags: ['api'],
            handler: userHandler.signup,
            validate: {
                payload: userSchema.signup.payload
            }
        }
    },

    {
        method: "GET",
        path: "/user/{id}",
        config: {
            description: "buscar um usuário pelo id",
            tags: ['api'],
            handler: userHandler.search,
            validate: {
                params: userSchema.search.params,
            }
        }
    },

    {
        method: "GET",
        path: "/user",
        config: {
            description: "buscar todos os usuários",
            tags: ['api'],
            handler: userHandler.getAll,
        }
    },

    {
        method: "POST",
        path: "/forgotPassword",
        config: {
            description: "solicita um código de recuperação de senha",
            tags: ['api'],
            handler: userHandler.forgotPassword,
            validate: {
                payload: userSchema.forgotPassword.payload
            }
        }
    },

    {
        method: "POST",
        path: "/changePassword",
        config: {
            description: "atualiza senha do usuário",
            tags: ['api'],
            handler: userHandler.changePassword,
            validate: {
                payload: userSchema.changePassword.payload
            }
        }
    },
];
