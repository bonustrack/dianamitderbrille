import Joi from '@hapi/joi';

export const signup = Joi.object({
  email: Joi.string()
    .email({ tlds: false })
    .required(),
  password: Joi.string()
    .min(8)
    .max(64)
    .required(),
  name: Joi.string()
    .max(24)
    .required()
});
