import connectDB from '@/utils/connectDB';

import User from '@/utils/models/User';
import { authOptions } from 'pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth/next';
import { transporter, mailOptions } from '@/utils/nodeMailer';

const email = process.env.EMAIL;
const pass = process.env.EMAIL_PASS;

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

    // get order
    if (req.method === 'POST') {
      const { func, message } = req.body;
      // if (func === 'orderConfirmed') {
      //   await transporter.sendMail(message);
      // }
      res.status(200).json({ staus: 'success' });
    }
    if (req.method === 'GET') {
      res.status(200).json({});
    }
  } catch (err) {
    res.status(500).json(err);
  }
}
