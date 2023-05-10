import connectDB from '@/utils/connectDB';
import Post from '@/utils/models/Post';
import User from '@/utils/models/User';
import { authOptions } from 'pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth/next';

export default async function handler(req, res) {
  try {
    // connect to mongo
    connectDB();
    // chack current session and make sure user is admin
    let isAdmin;
    const session = await getServerSession(req, res, authOptions);
    if (session) {
      const user = await User.findOne({ email: session.user.email });
      if (user) isAdmin = user.isAdmin;
    }

    // new post
    if (req.method === 'POST' && isAdmin) {
      const newPost = await Post.create(req.body);
      console.log('posted new');
      res.status(200).json(newPost);
    }
    if (req.method === 'GET') {
      // get specific post
      const postId = req.query.id;
      if (postId) {
        const post = await Post.findById(postId);
        console.log('get post');
        res.status(200).json(post);
        // get all posts
      } else {
        const allPosts = await Post.find().sort({ createdAt: 'desc' });
        console.log('get posts');
        res.status(200).json(allPosts);
      }
    }
    // edit post
    if (req.method === 'PUT' && isAdmin) {
      const post = req.body;
      const id = req.body._id;
      console.log(id);
      const updatePost = await Post.findByIdAndUpdate(id, post);
      console.log('update post');
      res.status(200).json(updatePost);
    }
    // delete post
    if (req.method === 'DELETE' && isAdmin) {
      const postId = req.body.id;
      const deletedPost = await Post.findByIdAndDelete(postId);
      console.log('delete post');
      res.status(200).json(deletedPost);
    }
  } catch (err) {
    res.status(500).json(err);
  }
}
