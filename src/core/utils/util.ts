import bcrypt from "bcrypt";
import jwt, { Secret } from "jsonwebtoken";
import config from "../../config";
import { IUser } from "../interfaces/user.interface";
import { IAdmin } from "../interfaces/admin.interface";

export const generateOtpCode = (length: number = 4): string => {
  let randomCode = Math.floor(Math.random() * Math.pow(10, length)).toString();

  if (randomCode.length < length) {
    randomCode = randomCode.padStart(length, "0");
  }
  return randomCode;
};

export const generateHash = async (input: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(input, salt);

  return hash;
};

export const compareHash = async (
  input: string,
  hash: string,
): Promise<boolean> => {
  const match = await bcrypt.compare(input, hash);
  return match;
};

export const generateAccessToken = (data: IUser | IAdmin): string => {
  const payload = {
    id: data.id,
    email: data.email,
    firstName: data.firstName,
    lastName: data.lastName,
    role: 'admin' in data ? 'admin' : 'user'
  };
  
  const token = jwt.sign(payload, config.JWT_SECRET as Secret, {
    expiresIn: "24h",
  });
  return token;
};

export const generateRefreshToken = (data: IUser | IAdmin): string => {
  const payload = {
    id: data.id,
    email: data.email,
    firstName: data.firstName,
    lastName: data.lastName,
    role: 'admin' in data ? 'admin' : 'user'
  };

  const token = jwt.sign(payload, config.JWT_SECRET as Secret, {
    expiresIn: "30d",
  });
  return token;
};

export const decodeUserToken = (token: string): IUser | IAdmin => {
  return jwt.verify(token, config.JWT_SECRET as Secret) as IUser | IAdmin;
};

