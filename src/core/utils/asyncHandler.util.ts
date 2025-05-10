import { Request, Response, NextFunction, RequestHandler } from 'express';
import errorHandlerMiddleware from '../handlers/mongooseError.handler';
import { responseHandler } from '../handlers/response.handler';
import { getErrorCode, getErrorMessage } from '../handlers/error.handlers';


export const asyncHandler = (
  requestHandler: (req: Request, res: Response, next: NextFunction) => Promise<any>
): RequestHandler => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await requestHandler(req, res, next);
    } 
    catch (err) 
    {
        const errorMongoose = errorHandlerMiddleware(err, res);
        let code = errorMongoose.statusCode;
        let message = errorMongoose.msg;
        if (errorMongoose.mongooseError) {
            return responseHandler(res, null, code, message);
        } else {
            code = getErrorCode(err) as number;
            message = getErrorMessage(err);
            return responseHandler(res, null, code, message);
        }
    }
  };
};
