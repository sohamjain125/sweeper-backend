export interface IUser {
    userId: string;
    username: string;
    password: string;
    profile?: string;
    phoneNumber: string;
    address: string[];
    usertype: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IUserResponse {
    code: number;
    message: string;
    data?: IUser;
    error?: string;
} 

export interface IAuthenticatedUser
{
    id: string, 
    role: string
}