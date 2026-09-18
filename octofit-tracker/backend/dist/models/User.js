import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    avatar: { type: String },
}, { timestamps: true });
export const UserModel = mongoose.model('User', userSchema);
