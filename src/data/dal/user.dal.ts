import { User } from '../models/user.model';
import { IUser } from '../../core/interfaces/user.interface';

export class UserDAL {
    static async create(userData: IUser): Promise<IUser> {
        const user = new User(userData);
        return await user.save();
    }

    static async findByEmail(email: string): Promise<IUser | null> {
        return await User.findOne({ email });
    }

    static async findById(id: string): Promise<IUser | null> {
        return await User.findById(id);
    }

    static async update(id: string, userData: Partial<IUser>): Promise<IUser | null> {
        return await User.findByIdAndUpdate(id, userData, { new: true });
    }

    static async delete(id: string): Promise<IUser | null> {
        return await User.findByIdAndDelete(id);
    }
}

