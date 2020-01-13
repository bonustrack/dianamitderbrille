import Joi from '@hapi/joi';

export const signup = Joi.object({
  email: Joi.string()
    .email({ tlds: false })
    .lowercase({ force: true })
    .trim()
    .required(),
  password: Joi.string()
    .min(8)
    .max(32)
    .trim()
    .required(),
  name: Joi.string()
    .max(24)
    .trim()
    .required()
});

export const login = Joi.object({
  email: Joi.string()
    .trim()
    .required(),
  password: Joi.string()
    .trim()
    .required()
});
