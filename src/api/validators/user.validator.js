import Joi from 'joi';

export function validateRefreshToken(body) {
  const schema = Joi.object({
    refreshToken: Joi.string().min(10).required()
  });
  return schema.validate(body);
}

export function validateForgotPassword(body) {
  const schema = Joi.object({
    password: Joi.string().min(6).max(20).required()
  });
  return schema.validate(body);
}

export function validateChangePassword(body) {
  const schema = Joi.object({
    oldPassword: Joi.string().min(6).max(20).required(),
    newPassword: Joi.string().min(6).max(20).required()
  });
  return schema.validate(body);
}