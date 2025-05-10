import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../../config';
import { HttpStatusCodes, ResponseMessages } from '../../core/constants/cloud.constants';
import { responseHandler } from '../../core/handlers/response.handler';
import { CustomError, getErrorCode, getErrorMessage } from '../../core/handlers/error.handlers';
import errorHandlerMiddleware from '../../core/handlers/mongooseError.handler';
import {decodeUserToken} from '../../core/utils/jwt.util'
import { AuthenticatedRequest } from 'src/core/interfaces/authenticatedRequest.interfaces';

export const userAuthMiddleware = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        
        if (!token) {
            throw new CustomError(
                ResponseMessages.RES_MSG_INVALID_TOKEN_EN,
                'UNAUTHORIZED'
            );
        }

        const decoded = decodeUserToken(token);
        req.userId = decoded.id as string;
        req.role=decoded.role as string;
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

export const adminAuthMiddleware = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        
        if (!token) {
            throw new CustomError(
                ResponseMessages.RES_MSG_INVALID_TOKEN_EN,
                'UNAUTHORIZED'
            );
        }

        const decoded = decodeUserToken(token);
        req.userId = decoded.id as string;
        req.role=decoded.role as string;

        if(req.role==='User')
        {
            throw new CustomError(
                ResponseMessages.RES_MSG_ACCESS_DENIED_EN,
                'UNAUTHORIZED'
            );
        }

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

