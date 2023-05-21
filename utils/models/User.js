import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    password: { type: String },
    email: { type: String, required: true },
    phone: { type: String, default: '' },
    address: { type: String, default: '' },
    isAdmin: { type: Boolean, default: false },
    image: { type: String },
    provider: { type: String, required: true, default: 'local' },
    provider_id: { type: String },
  },
  { timestamps: true }
);
// Create a compound index on email and provider fields
UserSchema.index({ email: 1, provider: 1 }, { unique: true });

export default mongoose.models.User || mongoose.model('User', UserSchema);
