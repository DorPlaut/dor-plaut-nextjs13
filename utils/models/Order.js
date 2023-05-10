// const mongoose = require('mongoose');
import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    printify_id: { type: String, default: '0' },
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
    shipTo: {
      first_name: { type: String },
      last_name: { type: String },
      email: { type: String },
      phone: { type: String },
      country: { type: String },
      region: { type: String },
      address1: { type: String },
      address2: { type: String },
      city: { type: String },
      zip: { type: String },
    },

    shipping: { type: String },
    total: { type: String },
    paid: { type: Boolean, default: false },
    status: { type: String, default: 'in process' },
  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model('Order', OrderSchema);
