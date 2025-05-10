import { Response } from "express";
import { ResponseBodyInterface } from "../interfaces/response.interface";

export const responseHandler = (
  res: Response,
  body: ResponseBodyInterface | null | undefined ,
  status: number | 200,
  message?: string,
) => {
  const retunBody = {
    ...body,
    status: status,
    message: message || "",
  };
  return res.status(status).json(retunBody);
};