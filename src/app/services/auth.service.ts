import { IUser } from '../../core/interfaces/user.interface';
import { UserDAL } from '../../data/dal/user.dal';
import { generateHash, compareHash } from '../../core/utils/hash.util';
import{generateAccessToken} from '../../core/utils/jwt.util'
import { ResponseMessages } from '../../core/constants/cloud.constants';
import { CustomError } from '../../core/handlers/error.handlers';


export const registerUser = async (userData: IUser): Promise<IUser> => {
    const existingUser = await UserDAL.findByPhoneNum(userData.phoneNumber);
    if (existingUser) {
        throw new CustomError(
            ResponseMessages.RES_MSG_USER_PHONE_ALREADY_EXISTS_EN,
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

export const loginUser = async (username: string, password: string): Promise<{ accessToken: string; user: IUser }> => {
    const user = await UserDAL.findByUsername(username);
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

    return { accessToken, user };
};



export const loginAdmin = async (username: string, password: string): Promise<{ accessToken: string;  admin: IUser }> => {
    const admin = await UserDAL.findByUsername(username);
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

    return { accessToken, admin };
}; 