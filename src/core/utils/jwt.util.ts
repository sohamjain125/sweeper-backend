import jwt, { Secret } from "jsonwebtoken";
import config from "../../config";
import { IUser, IAuthenticatedUser } from "../interfaces/user.interface";

export const generateAccessToken = (data: IUser): string => {
    const payload = {
      id: data.userId,
      role: data.usertype
    };
    
    const token = jwt.sign(payload, config.JWT_SECRET as Secret, {
      expiresIn: "24h",
    });
    return token;
  };

export const decodeUserToken = (token: string): IAuthenticatedUser => {
    return jwt.verify(token, config.JWT_SECRET as Secret) as IAuthenticatedUser ;
  };