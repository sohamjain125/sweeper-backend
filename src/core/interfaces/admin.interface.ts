export interface IAdmin {
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

export interface IAdminResponse {
    code: number;
    message: string;
    data?: IAdmin;
    error?: string;
} 