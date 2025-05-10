export interface IUser {
    id?: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    profile?: string;
    phoneNumber: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IUserResponse {
    code: number;
    message: string;
    data?: IUser;
    error?: string;
} 