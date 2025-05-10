import Joi from 'joi';

export const userRegisterSchema = Joi.object({
    firstName: Joi.string().required().min(2).max(50),
    lastName: Joi.string().required().min(2).max(50),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(6),
    phoneNumber: Joi.string().required().pattern(/^[0-9]{10}$/),
    profile: Joi.string().optional()
});

export const userLoginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

export const adminRegisterSchema = Joi.object({
    firstName: Joi.string().required().min(2).max(50),
    lastName: Joi.string().required().min(2).max(50),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(6),
    phoneNumber: Joi.string().required().pattern(/^[0-9]{10}$/),
    profile: Joi.string().optional()
});

export const adminLoginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
}); 