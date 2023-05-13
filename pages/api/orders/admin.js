import connectDB from '@/utils/connectDB';

import User from '@/utils/models/User';
import Order from '@/utils/models/Order';
import { authOptions } from 'pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth/next';
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
    console.log('OKKK');

    const email = process.env.EMAIL;
    const webName = process.env.WEB_NAME;
    const url = process.env.URL;

    // get all orders
    if (req.method === 'GET') {
      console.log(isAdmin);
    }
    if (req.method === 'GET' && isAdmin) {
      console.log('get order');
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
