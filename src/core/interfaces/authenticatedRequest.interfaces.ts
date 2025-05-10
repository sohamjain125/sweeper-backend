import { Request, Response, NextFunction } from 'express';

export interface AuthenticatedRequest extends Request{
    userId:String,
    role: String
}