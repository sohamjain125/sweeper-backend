import { Request, Response } from 'express';
import { registerUser, loginUser, loginAdmin } from '../services/auth.service';
import { responseHandler } from '../../core/handlers/response.handler';
import { HttpStatusCodes, ResponseMessages } from '../../core/constants/cloud.constants';
import errorHandlerMiddleware from '../../core/handlers/mongooseError.handler';
import { getErrorCode, getErrorMessage } from '../../core/handlers/error.handlers';
import { asyncHandler } from 'src/core/utils/asyncHandler.util';

export const registerUserController = asyncHandler(async (req: Request, res: Response) => {
        const user = await registerUser(req.body);
        return responseHandler(
            res,
            { data: user },
            HttpStatusCodes.CREATED,
            ResponseMessages.RES_MSG_USER_CREATED_SUCCESSFULLY_EN
        );
});

export const loginUserController = asyncHandler(async (req: Request, res: Response) => {
   
        const { email, password } = req.body;
        const { accessToken, user } = await loginUser(email, password);
        return responseHandler(
            res,
            { data: { accessToken, user } },
            HttpStatusCodes.OK,
            ResponseMessages.RES_MSG_USER_LOGIN_SUCCESSFULLY_EN
        );
});



export const loginAdminController = asyncHandler(async (req: Request, res: Response) => {
 
        const { email, password } = req.body;
        const { accessToken, admin } = await loginAdmin(email, password);
        return responseHandler(
            res,
            { data: { accessToken, admin } },
            HttpStatusCodes.OK,
            ResponseMessages.RES_MSG_ADMIN_LOGIN_SUCCESSFULLY_EN
        );
});