import Cart from '@/utils/models/Cart';
import connectDB from '@/utils/connectDB';

export default async function handler(req, res) {
  connectDB();
  try {
    if (req.method === 'POST') {
      const { userId, product } = req.body;
      const userCart = await Cart.findOne({ userId });
      if (!userCart) {
        console.log('no cart');
        const newCart = await Cart.create({
          userId: req.body.userId,
          products: [req.body.product],
        });
        console.log(newCart);
        res.status(201).json({ newCart });
      } else {
        console.log('cart exict. update cart');
        const filter = { userId };
        userCart.products.push(product);
        const newProductsArr = userCart.products;
        const update = { products: newProductsArr };
        const finalCart = await Cart.findOneAndUpdate(filter, update);
        res.status(201).json(finalCart);
      }
    }
    if (req.method === 'PUT') {
      const { userId, product } = req.body;
      const userCart = await Cart.findOne({ userId });
      if (!userCart) {
        console.log('no cart');
        res.status(500).json({ err: 'no user cart' });
      } else {
        const { _id, quantity } = product;
        console.log('cart exict. update cart item quantity');
        // find specific item inside cart and update the quantity
        const filter = { userId, 'products._id': _id };
        const update = { $set: { 'products.$.quantity': quantity } };
        const finalCart = await Cart.findOneAndUpdate(filter, update, {
          new: true,
        });
        res.status(201).json(finalCart);
      }
    }
    if (req.method === 'GET') {
      const userId = req.query.id;
      const userCart = await Cart.findOne({ userId });
      if (userCart) {
        console.log('get cart');
        res.status(200).json(userCart);
      } else {
        res.status(404).json({ message: 'no user cart' });
      }
    }
    // Delete product from cart
    if (req.method === 'PATCH') {
      const { userId, product } = req.body;
      const sku = product.sku;
      const userCart = await Cart.findOne({ userId: userId });
      const products = userCart.products;
      const newProducts = products.filter((i) => {
        return i.sku !== sku;
      });
      const filter = { userId: userId };
      const update = { products: newProducts };
      const finalCart = await Cart.findOneAndUpdate(filter, update);
      console.log('item deleted');
      res.status(201).json();
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}
