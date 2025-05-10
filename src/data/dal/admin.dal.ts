
import { IAdmin } from '../../core/interfaces/admin.interface';
import { Admin } from '../models/admin.model';

export class AdminDAL {
    static async create(adminData: IAdmin): Promise<IAdmin> {
        const admin = new Admin(adminData);
        return await admin.save();
    }

    static async findByEmail(email: string): Promise<IAdmin | null> {
        return await Admin.findOne({ email });
    }

    static async findById(id: string): Promise<IAdmin | null> {
        return await Admin.findById(id);
    }

    static async update(id: string, adminData: Partial<IAdmin>): Promise<IAdmin | null> {
        return await Admin.findByIdAndUpdate(id, adminData, { new: true });
    }

    static async delete(id: string): Promise<IAdmin | null> {
        return await Admin.findByIdAndDelete(id);
    }
} 