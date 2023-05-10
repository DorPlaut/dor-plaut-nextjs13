// const mongoose = require('mongoose');
import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    tags: { type: Array },
    price: { type: Number },
    variants: [
      {
        title: { type: String },
        is_available: { type: Boolean, default: false },
      },
    ],
    images: [
      {
        src: { type: String },
        is_default: { type: Boolean },
      },
    ],
    provider: { type: String, default: 'self' },
    visible: { type: Boolean, default: false },
    is_locked: { type: Boolean, default: false },
    created_at: { type: Date, default: Date.now() },
  },
  { timestamps: true }
);

export default mongoose.models.Product ||
  mongoose.model('Product', ProductSchema);
