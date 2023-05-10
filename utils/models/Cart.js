// const mongoose = require('mongoose');
import mongoose from 'mongoose';

const CartSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    products: [
      {
        title: { type: String },
        colorAndSize: { type: String },
        sku: { type: String },
        price: { type: Number },
        image: { type: String },
        quantity: { type: Number, default: 1 },
        provider: { type: String },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.Cart || mongoose.model('Cart', CartSchema);
