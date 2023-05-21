import User from '@/utils/models/User';
import connectDB from '@/utils/connectDB';

export default async function handler(req, res) {
  connectDB();
  try {
    if (req.method === 'POST') {
      console.log(req.body);
      const { username, email, image, provider, provider_id } = req.body;
      const user = await User.findOne({ email });
      // if there is no user from this provider
      if (!user || user.provider === 'local') {
        console.log('no user in db. register new user');
        const newUser = await User.create({
          username,
          email,
          image,
          provider_id,
          provider,
        });
        // if user was created
        if (newUser) {
          res.status(200).json({ newUser });
        } else {
          console.log('user logged in');
          res.status(200).json({ user });
        }
      }
      // if user exist in google db
      else {
        console.log('user logged in');
        res.status(200).json({ user });
      }
    }
    if (req.method === 'GET') {
      const { email, provider } = req.query;
      if (provider === 'local') {
        const user = await User.findOne({ email, provider });
        if (user) {
          console.log(`welcome ${user.username}`);
          res.status(200).json({ user });
        }
      } else {
        const user = await User.findOne({
          email: email,
          provider: { $ne: 'local' },
        });
        if (user) {
          console.log(`welcome ${user.username}`);
          res.status(200).json({ user });
        }
      }
    }
  } catch (err) {
    console.log(err);
  }
}
