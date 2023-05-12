import connectDB from '@/utils/connectDB';
import Product from '@/utils/models/Product';
import User from '@/utils/models/User';
import { authOptions } from 'pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth/next';
import getProducts from '@/utils/getProducts.js';

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

    // new product
    if (req.method === 'POST' && isAdmin) {
      if (req.body.images.length < 1) {
        const images = {
          src: '/no_img.jpg',
          is_default: true,
        };
        const product = { ...req.body, images };
        const newProduct = await Product.create(product);
        console.log('new product');
        res.status(200).json(newProduct);
      } else {
        const newProduct = await Product.create(req.body);
        console.log('new product');
        res.status(200).json(newProduct);
      }
    }
    if (req.method === 'GET') {
      // get specific product
      const productId = req.query.id;
      if (productId) {
        const products = await getProducts();
        const product = products.find((product) => {
          if (product.provider === 'self') return product._id === productId;
          if (product.provider === 'printify') return product.id === productId;
        });
        // const product = await Product.findById(productId);
        res.status(200).json(product);
        // get all products
      } else {
        const products = await getProducts();
        const allPosts = await Product.find().sort({ createdAt: 'desc' });
        console.log('get products');
        res.status(200).json([...allPosts, ...products]);
      }
    }
    // edit post
    if (req.method === 'PUT' && isAdmin) {
      const product = req.body;
      const id = req.body._id;
      console.log(id);
      const updatePost = await Product.findByIdAndUpdate(id, product);
      console.log('update post');
      res.status(200).json(updatePost);
    }
    // delete post
    if (req.method === 'DELETE' && isAdmin) {
      const productId = req.body.id;
      console.log(productId);
      const deletedProduct = await Product.findByIdAndDelete(productId);
      console.log('delete product');
      res.status(200).json(deletedProduct);
    }
  } catch (err) {
    res.status(500).json(err);
  }
}
