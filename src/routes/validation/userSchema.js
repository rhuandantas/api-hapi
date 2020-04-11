"use strict";

const Joi = require("@hapi/joi");

module.exports = {
  signup: {
    payload: Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required()
    })
  },
  signin: {
    payload: Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required()
    })
  },
  search: {
    params: Joi.object({
      id: Joi.string().required(),
    }),
    headers: Joi.object({
      'Authentication': Joi.string().required()
    })
  },
  changePassword: {
    payload: Joi.object({
      code: Joi.string().required(),
      email: Joi.string().email().required(),
      newPassword: Joi.string().required()
    })
  },
  forgotPassword: {
    payload: Joi.object({
      email: Joi.string().email().required()
    })
  }
};
