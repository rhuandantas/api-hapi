"use strict";

const Joi = require("@hapi/joi");

module.exports = {
  request: {
    user: {
      headers: {
        Bearer: Joi.string().required()
      },
      payload: {
        email: Joi.string()
          .email()
          .required()
          .error(new Error("Email input is required")),
        senha: Joi.string()
          .min(8)
          .required()
          .error(new Error("Senha input is required"))
      }
    }
  }
};
