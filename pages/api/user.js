import User from '@/utils/models/User';
import connectDB from '@/utils/connectDB';

export default async function handler(req, res) {
  connectDB();
  try {
    if (req.method === 'POST') {
      const { username, email, image, google_id } = req.body;
      const user = await User.findOne({ google_id });
      if (!user) {
        console.log('no user in db. register new user');
        const newUser = await User.create({
          username,
          email,
          image,
          google_id,
        });
        res.status(200).json({ newUser });
      } else {
        console.log('user logged in');
        res.status(200).json({ user });
      }
    }
    if (req.method === 'GET') {
      const email = req.query.email;
      const user = await User.findOne({ email });
      if (user) {
        console.log(`welcome ${user.username}`);
        res.status(200).json({ user });
      } else {
        res.status(401).json({ err: 'no user' });
      }
    }
  } catch (err) {
    console.log(err);
  }
}
