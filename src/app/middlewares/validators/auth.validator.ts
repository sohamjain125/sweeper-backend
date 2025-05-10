import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import { responseHandler } from '../../../core/handlers/response.handler';
import { HttpStatusCodes, ResponseMessages } from '../../../core/constants/cloud.constants';

// Validation Schemas
export const userRegisterSchema = Joi.object({
    username: Joi.string().required().min(2).max(50),
    password: Joi.string().required().min(6),
    phoneNumber: Joi.string().required().pattern(/^[0-9]{10}$/),
    usertype: Joi.string().required()
});

export const userLoginSchema = Joi.object({
    username: Joi.string().required().min(2).max(50),
    password: Joi.string().required()
});



export const adminLoginSchema = Joi.object({
    username: Joi.string().required().min(2).max(50),
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