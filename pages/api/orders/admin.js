import connectDB from '@/utils/connectDB';
const Post = require('@/utils/models/Post');
const User = require('@/utils/models/User');
const Cart = require('@/utils/models/Cart');
const Order = require('@/utils/models/Order');
import { authOptions } from 'pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth/next';
import { calculateShippingfunc } from '@/utils/calculateShipping';
import { submitOrder } from '@/utils/submitOrder';
import { getPrintifyOrder } from '@/utils/getPrintifyOrder';
import { transporter, mailOptions } from '@/utils/nodeMailer';

export default async function handler(req, res) {
  try {
    // connect to mongo
    connectDB();
    // chack current session and make sure user is admin
    let user;
    let isAdmin;
    const session = await getServerSession(req, res, authOptions);
    if (session) {
      user = await User.findOne({ email: session.user.email });
      if (user) isAdmin = user.isAdmin;
    }

    const email = process.env.EMAIL;
    const webName = process.env.WEB_NAME;
    const url = process.env.URL;

    // get all orders
    if (req.method === 'GET' && isAdmin) {
      const printifyOrders = await getPrintifyOrder();
      const orders = await Order.find();
      const allOrders = {
        printify: printifyOrders,
        self: orders,
      };
      res.status(200).json(allOrders);
    }
    // delete order
    if (req.method === 'DELETE' && isAdmin) {
      const { orderId } = req.body;
      const order = await Order.findByIdAndDelete(orderId);
      res.status(200).json(order);
    }
    // edit order status
    if (req.method === 'PUT' && isAdmin) {
      const { orderId, status } = req.body;
      const order = await Order.findByIdAndUpdate(orderId, { status });
      res.status(200).json(order);
    }

    //
    //
  } catch (err) {
    res.status(500).json(err);
  }
}
