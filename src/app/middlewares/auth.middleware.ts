import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../../config';
import { HttpStatusCodes, ResponseMessages } from '../../core/constants/cloud.constants';
import { responseHandler } from '../../core/handlers/response.handler';
import { CustomError, getErrorCode, getErrorMessage } from '../../core/handlers/error.handlers';
import errorHandlerMiddleware from '../../core/handlers/mongooseError.handler';

export interface AuthRequest extends Request {
    user?: any;
    admin?: any;
}

export const userAuthMiddleware = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        
        if (!token) {
            throw new CustomError(
                ResponseMessages.RES_MSG_INVALID_TOKEN_EN,
                'UNAUTHORIZED'
            );
        }

        const decoded = jwt.verify(token, config.JWT_SECRET as string);
        req.user = decoded;
        next();
    } catch (error) {
        const errorMongoose = errorHandlerMiddleware(error, res);
        let code = errorMongoose.statusCode;
        let message = errorMongoose.msg;
        if (errorMongoose.mongooseError) {
            return responseHandler(res, null, code, message);
        } else {
            code = getErrorCode(error) as number;
            message = getErrorMessage(error);
            return responseHandler(res, null, code, message);
        }
    }
};

export const adminAuthMiddleware = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        
        if (!token) {
            throw new CustomError(
                ResponseMessages.RES_MSG_UNAUTHORIZED_ADMIN_EN,
                'UNAUTHORIZED'
            );
        }

        const decoded = jwt.verify(token, config.JWT_SECRET as string);
        req.admin = decoded;
        next();
    } catch (error) {
        const errorMongoose = errorHandlerMiddleware(error, res);
        let code = errorMongoose.statusCode;
        let message = errorMongoose.msg;
        if (errorMongoose.mongooseError) {
            return responseHandler(res, null, code, message);
        } else {
            code = getErrorCode(error) as number;
            message = getErrorMessage(error);
            return responseHandler(res, null, code, message);
        }
    }
}; 