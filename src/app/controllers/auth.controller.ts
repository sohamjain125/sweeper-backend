import { Request, Response } from 'express';
import { registerUser, loginUser, registerAdmin, loginAdmin } from '../services/auth.service';
import { responseHandler } from '../../core/handlers/response.handler';
import { HttpStatusCodes, ResponseMessages } from '../../core/constants/cloud.constants';
import errorHandlerMiddleware from '../../core/handlers/mongooseError.handler';
import { getErrorCode, getErrorMessage } from '../../core/handlers/error.handlers';

export const registerUserController = async (req: Request, res: Response) => {
    try {
        const user = await registerUser(req.body);
        return responseHandler(
            res,
            { data: user },
            HttpStatusCodes.CREATED,
            ResponseMessages.RES_MSG_USER_CREATED_SUCCESSFULLY_EN
        );
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

export const loginUserController = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const { accessToken, refreshToken, user } = await loginUser(email, password);
        return responseHandler(
            res,
            { data: { accessToken, refreshToken, user } },
            HttpStatusCodes.OK,
            ResponseMessages.RES_MSG_USER_LOGIN_SUCCESSFULLY_EN
        );
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

export const registerAdminController = async (req: Request, res: Response) => {
    try {
        const admin = await registerAdmin(req.body);
        return responseHandler(
            res,
            { data: admin },
            HttpStatusCodes.CREATED,
            ResponseMessages.RES_MSG_ADMIN_CREATED_SUCCESSFULLY_EN
        );
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

export const loginAdminController = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const { accessToken, refreshToken, admin } = await loginAdmin(email, password);
        return responseHandler(
            res,
            { data: { accessToken, refreshToken, admin } },
            HttpStatusCodes.OK,
            ResponseMessages.RES_MSG_ADMIN_LOGIN_SUCCESSFULLY_EN
        );
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