// const mongoose = require('mongoose');
import mongoose from 'mongoose';

const PageSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    content: { type: String, required: true },
    images: { type: Array },
    category: {
      type: String,
      enum: ['menu_page', 'legal', 'other'],
      default: 'menu_page',
    },
  },
  { timestamps: true }
);

export default mongoose.models.Page || mongoose.model('Page', PageSchema);
