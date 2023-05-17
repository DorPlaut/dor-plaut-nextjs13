import connectDB from '@/utils/connectDB';

import User from '@/utils/models/User';
import { authOptions } from 'pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth/next';
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

    const siteEmail = process.env.EMAIL;
    const webName = process.env.WEB_NAME;
    const url = process.env.URL;

    // get order
    if (req.method === 'POST') {
      const { name, email, message } = req.body;
      console.log(email);
      await transporter.sendMail({
        from: email,
        to: siteEmail,
        subject: `Hello ${webName}, you have a new message from ${name}`,
        text: `Hello ${webName}, you have a new message from: \n\n ${name} \n\ ${email} \n\n ${message}`,
        html: `<p style="text-align:center">Hello ${webName}, you have a new message from: <br/> ${name} <br/> ${email} <br/> ${message}</p>`,
      });
      res.status(200).json({ staus: 'success' });
    }
    if (req.method === 'GET') {
      res.status(200).json({});
    }
  } catch (err) {
    res.status(500).json(err);
  }
}
