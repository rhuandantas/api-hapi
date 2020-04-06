const joi = require('@hapi/joi');
const userHandler = require("./../handler/user");

module.exports = [
    {
        method: "POST",
        path: "/signin",
        config: {
            tags: ['api'],
            handler: userHandler.signin,
            validate: {
                payload: joi.object({
                    email: joi.string().email().required(),
                    password: joi.string().required(),
                })
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
                payload: joi.object({
                    name: joi.string().required(),
                    email: joi.string().email().required(),
                    password: joi.string().required(),
                })
            }
        }
    },

    {
        method: "GET",
        path: "/user/{id}",
        config: {
            description: "buscar um user pelo id",
            notes: "teste",
            tags: ['api'],
            handler: userHandler.search,
            validate: {
                params: joi.object({
                    id: joi.string().required(),
                })
            }
        }
    },

    {
        method: "GET",
        path: "/user",
        config: {
            description: "buscar todos os uers",
            notes: "teste",
            tags: ['api'],
            handler: userHandler.getAll,
        }
    }
];
