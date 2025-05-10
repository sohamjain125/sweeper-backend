import { Schema, model } from 'mongoose';
import { IUser } from '../../core/interfaces/user.interface';

const userSchema = new Schema<IUser>({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    profile: { type: String },
}, {
    timestamps: true
});

// Compound index for firstName and lastName for name-based searches
userSchema.index({ firstName: 1, lastName: 1 });

// Text index for full-text search capabilities
userSchema.index({ 
    firstName: 'text', 
    lastName: 'text', 
    email: 'text' 
});

export const User = model<IUser>('User', userSchema); 