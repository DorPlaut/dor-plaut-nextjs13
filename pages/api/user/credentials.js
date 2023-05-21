import User from '@/utils/models/User';
import connectDB from '@/utils/connectDB';
import bcrypt from 'bcrypt';

export default async function handler(req, res) {
  connectDB();
  try {
    // handle user login
    if (req.method === 'GET') {
      const { email, password } = req.query;
      const provider = 'local';
      const user = await User.findOne({ email, provider });
      //   if user is not exict
      if (!user) {
        console.log('false login: no user');
        res
          .status(401)
          .json({ error: 'There is no user with this email. please sign up' });
      }
      //    if there is no password
      if (!password) {
        console.log('false login: no password');
        res.status(401).json({ error: 'Please enter a password' });
        return;
      }
      //   if password is incorrect
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        console.log('false login: Incorrect password');
        res
          .status(401)
          .json({ error: 'The password you provided is incorrect' });
        return;
      }
      //   if all is correct
      console.log('Correct password. sign in');
      res.status(200).json({ user });
    }
    //
    // handle user signup
    //
    if (req.method === 'POST') {
      const { email, username, password } = req.body;
      // hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.findOne({ email });
      // if user is already exist
      if (user) {
        console.log('user already exict');
        res.status(401).json({ error: 'user already exict' });
      }
      // if user is not exict. create new user
      if (!user) {
        console.log('new user signup');

        const newUser = await User.create({
          username,
          password: hashedPassword,
          email,
        });
        res.status(200).json({ user: newUser });
      }
    }
  } catch (err) {
    console.log(err);
  }
}
