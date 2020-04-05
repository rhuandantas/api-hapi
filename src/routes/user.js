const userHandler = require("./../handler/user");

module.exports = [
    {
        method: "POST",
        path: "/signin",
        config: {
            handler: userHandler.signin,
        }
    },

    {
        method: "POST",
        path: "/signup",
        handler: userHandler.signup
    },

    {
        method: "GET",
        path: "/user/{id}",
        handler: userHandler.search
    },

    {
        method: "GET",
        path: "/user",
        handler: userHandler.getAll
    }
];
