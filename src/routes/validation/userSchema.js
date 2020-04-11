"use strict";

const joi = require("@hapi/joi");

module.exports = {
  signup: {
    payload: joi.object({
      name: joi.string().required(),
      email: joi.string().email().required(),
      password: joi.string().required()
    })
  },
  signin: {
    payload: joi.object({
      email: joi.string().email().required(),
      password: joi.string().required()
    })
  },
  search: {
    params: joi.object({
      id: joi.string().required(),
    }),
    headers: joi.object({
      'Authentication': joi.string().required()
    })
  },
  changePassword: {
    payload: joi.object({
      code: joi.string().required(),
      email: joi.string().email().required(),
      newPassword: joi.string().required()
    })
  },
  forgotPassword: {
    payload: joi.object({
      email: joi.string().email().required()
    })
  }
};
