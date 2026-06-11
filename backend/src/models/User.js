import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcrypt';
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    passwordHash: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['admin', 'public'],
        default: 'public',
    },
    cvData: {
        type: Buffer,
    },
    cvContentType: {
        type: String,
    },
}, {
    timestamps: true,
});
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.passwordHash);
};
// Pre-save middleware to hash password if it's new or modified
userSchema.pre('save', async function () {
    if (!this.isModified('passwordHash')) {
        return;
    }
    const salt = await bcrypt.genSalt(10);
    this.passwordHash = await bcrypt.hash(this.passwordHash, salt);
});
const User = mongoose.model('User', userSchema);
export default User;
//# sourceMappingURL=User.js.map