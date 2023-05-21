import User from '@/utils/models/User';
import connectDB from '@/utils/connectDB';

export default async function handler(req, res) {
  connectDB();
  try {
    if (req.method === 'GET') {
      const userId = req.query.id;
      const localUser = await User.findById(userId);
      //   if user exist localy
      if (localUser) {
        const user = {
          username: localUser.username,
          email: localUser.email,
          provider: localUser.provider,
        };
        res.status(200).json(user);
      } else {
        res.status(404).json({ err: 'no user in db' });
      }
    }
  } catch (err) {
    console.log(err);
  }
}
