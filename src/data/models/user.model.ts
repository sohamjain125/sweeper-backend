import { Schema, model } from 'mongoose';
import { IUser } from '../../core/interfaces/user.interface';
import {generateAccessToken} from '../../core/utils/jwt.util'
import {compareHash} from '../../core/utils/hash.util'

const userSchema = new Schema<IUser>({
    username: { type: String, required: true },
    password: { type: String, required: true },
    profile: { type: String },
    phoneNumber: { type: String, required: true },
    address:[{type:String}],
    usertype:{type:String, enum: ['Admin', 'User'], default:'User'}
}, {
    timestamps: true
});

// Compound index for firstName and lastName for name-based searches
userSchema.index({ firstName: 1, lastName: 1 });

userSchema.methods.checkPassword= function (password:string)
{
    return compareHash(password, this.password)
}

userSchema.methods.generateToken = function (this: IUser) {
    return generateAccessToken(this);
};


export const User = model<IUser>('User', userSchema); 