// const mongoose = require('mongoose');
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    google_id: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, default: '' },
    address: { type: String, default: '' },
    isAdmin: { type: Boolean, default: false },
    image: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model('User', UserSchema);

// module.exports = mongoose.models.User || mongoose.model('User', UserSchema);
