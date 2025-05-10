import { IUser } from '../../core/interfaces/user.interface';
import { IAdmin } from '../../core/interfaces/admin.interface';
import { UserDAL } from '../../data/dal/user.dal';
import { AdminDAL } from '../../data/dal/admin.dal';
import { generateHash, compareHash, generateAccessToken, generateRefreshToken } from '../../core/utils/util';
import { ResponseMessages } from '../../core/constants/cloud.constants';
import { CustomError } from '../../core/handlers/error.handlers';

export const registerUser = async (userData: IUser): Promise<IUser> => {
    const existingUser = await UserDAL.findByEmail(userData.email);
    if (existingUser) {
        throw new CustomError(
            ResponseMessages.RES_MSG_USER_EMAIL_ALREADY_EXISTS_EN,
            'CONFLICT'
        );
    }

    const hashedPassword = await generateHash(userData.password);
    const user = await UserDAL.create({
        ...userData,
        password: hashedPassword
    });

    return user;
};

export const loginUser = async (email: string, password: string): Promise<{ accessToken: string; refreshToken: string; user: IUser }> => {
    const user = await UserDAL.findByEmail(email);
    if (!user) {
        throw new CustomError(
            ResponseMessages.RES_MSG_USER_NOT_FOUND_EN,
            'NOT_FOUND'
        );
    }

    const isValidPassword = await compareHash(password, user.password);
    if (!isValidPassword) {
        throw new CustomError(
            ResponseMessages.RES_MSG_INVALID_PASSWORD,
            'UNAUTHORIZED'
        );
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    return { accessToken, refreshToken, user };
};

export const registerAdmin = async (adminData: IAdmin): Promise<IAdmin> => {
    const existingAdmin = await AdminDAL.findByEmail(adminData.email);
    if (existingAdmin) {
        throw new CustomError(
            ResponseMessages.RES_MSG_ADMIN_EMAIL_ALREADY_EXISTS_EN,
            'CONFLICT'
        );
    }

    const hashedPassword = await generateHash(adminData.password);
    const admin = await AdminDAL.create({
        ...adminData,
        password: hashedPassword
    });

    return admin;
};

export const loginAdmin = async (email: string, password: string): Promise<{ accessToken: string; refreshToken: string; admin: IAdmin }> => {
    const admin = await AdminDAL.findByEmail(email);
    if (!admin) {
        throw new CustomError(
            ResponseMessages.RES_MSG_ADMIN_NOT_FOUND_EN,
            'NOT_FOUND'
        );
    }

    const isValidPassword = await compareHash(password, admin.password);
    if (!isValidPassword) {
        throw new CustomError(
            ResponseMessages.RES_MSG_ADMIN_INVALID_PASSWORD,
            'UNAUTHORIZED'
        );
    }

    const accessToken = generateAccessToken(admin);
    const refreshToken = generateRefreshToken(admin);

    return { accessToken, refreshToken, admin };
}; 