import mongoose, { Schema, Document } from 'mongoose';
import { IAdmin } from '../../core/interfaces/admin.interface';

const adminSchema = new Schema<IAdmin>({
    firstName: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50,
        index: true
    },
    lastName: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50,
        index: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    phoneNumber: {
        type: String,
        required: true,
        match: /^[0-9]{10}$/,
        index: true
    },
    profile: {
        type: String,
        required: false
    }
}, {
    timestamps: true
});

// Compound index for firstName and lastName for name-based searches
adminSchema.index({ firstName: 1, lastName: 1 });

// Text index for full-text search capabilities
adminSchema.index({ 
    firstName: 'text', 
    lastName: 'text', 
    email: 'text' 
});

// Create and export the Admin model
export const Admin = mongoose.model<IAdmin>('Admin', adminSchema); 