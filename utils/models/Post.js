// const mongoose = require('mongoose');
import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    content: { type: String, required: true },
    images: { type: Array, default: [] },
    category: {
      type: String,
      default: 'blog',
    },
    publish: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Post || mongoose.model('Post', PostSchema);
