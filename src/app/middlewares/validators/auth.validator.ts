import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import { responseHandler } from '../../../core/handlers/response.handler';
import { HttpStatusCodes, ResponseMessages } from '../../../core/constants/cloud.constants';

// Validation Schemas
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

// Validation Middleware
export const validateUserRegister = (req: Request, res: Response, next: NextFunction) => {
    const { error } = userRegisterSchema.validate(req.body);
    if (error) {
        return responseHandler(
            res,
            { error: error.details[0].message },
            HttpStatusCodes.BAD_REQUEST,
            ResponseMessages.BAD_REQUEST
        );
    }
    next();
};

export const validateUserLogin = (req: Request, res: Response, next: NextFunction) => {
    const { error } = userLoginSchema.validate(req.body);
    if (error) {
        return responseHandler(
            res,
            { error: error.details[0].message },
            HttpStatusCodes.BAD_REQUEST,
            ResponseMessages.BAD_REQUEST
        );
    }
    next();
};

export const validateAdminRegister = (req: Request, res: Response, next: NextFunction) => {
    const { error } = adminRegisterSchema.validate(req.body);
    if (error) {
        return responseHandler(
            res,
            { error: error.details[0].message },
            HttpStatusCodes.BAD_REQUEST,
            ResponseMessages.BAD_REQUEST
        );
    }
    next();
};

export const validateAdminLogin = (req: Request, res: Response, next: NextFunction) => {
    const { error } = adminLoginSchema.validate(req.body);
    if (error) {
        return responseHandler(
            res,
            { error: error.details[0].message },
            HttpStatusCodes.BAD_REQUEST,
            ResponseMessages.BAD_REQUEST
        );
    }
    next();
}; 