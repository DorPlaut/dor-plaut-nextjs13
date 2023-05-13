import connectDB from '@/utils/connectDB';
import User from '@/utils/models/User';
import Cart from '@/utils/models/Cart';
import Order from '@/utils/models/Order';
import { authOptions } from 'pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth/next';
import { calculateShippingfunc } from '@/utils/calculateShipping';
import { submitOrder } from '@/utils/submitOrder';
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

    const email = process.env.EMAIL;
    const webName = process.env.WEB_NAME;
    const url = process.env.URL;

    // get order
    if (req.method === 'GET' && session) {
      const orderId = req.query.id;
      const userId = req.query.userId;
      const currentUserId = user._id;
      // make sure only the user can see his order
      if (currentUserId == userId) {
        const userOrder = await Order.findById(orderId);
        const printifyId = userOrder.printify_id;
        const printifyOrder = await getPrintifyOrder(printifyId);
        const { status, shipments, created_at } = printifyOrder;
        const order = {
          printify: printifyOrder,
          self: userOrder,
        };
        res.status(200).json(order);
      } else {
        res.status(401).json({ error: 'unauturized' });
      }
    }

    // Handle orders. calculate shiping
    if (req.method === 'POST' && session) {
      const { userId, cartId } = req.body;
      const shippingDetails = req.body.address_to;
      const userCart = await Cart.findById(cartId);
      // split cart by providers
      const PrintifyCart = userCart.products.filter(
        (i) => i.provider === 'printify'
      );
      const cart = userCart.products;
      // check total cost of cart
      const pricesArr = cart.map((i) => i.price * i.quantity);
      const cartTotalRaw = pricesArr.reduce((item, add) => item + add, 0);
      if (PrintifyCart.length < 1) {
        res.status(200).json({
          shipping: cartTotalRaw,
          shipping: '0',
          total: cartTotalRaw,
        });
      } else {
        // calculate shipping cost for printify products
        const shippingcost = await calculateShippingfunc(
          PrintifyCart,
          shippingDetails
        );
        // get user total cart cost with shipping
        const totalWithShipingRaw = shippingcost.shippingRaw + cartTotalRaw;
        const result = {
          shipping: shippingcost.shippingRaw,
          total: totalWithShipingRaw,
        };
        // format an order
        const newOrder = {
          userId: userId,
          products: cart,
          shipTo: shippingDetails,
          shipping: shippingcost.shippingRaw,
          total: totalWithShipingRaw,
          paid: false,
        };
        const userOrder = await Order.findOne({ userId: userId, paid: false });
        // update order
        let order;
        if (userOrder) {
          console.log('update order');
          const filter = userOrder._id;
          const update = {
            products: cart,
            shipTo: shippingDetails,
            shipping: shippingcost.shippingRaw,
            total: totalWithShipingRaw,
            paid: false,
            status: 'in process',
          };
          order = await Order.findByIdAndUpdate(filter, update, { new: true });
        } else {
          // create new order
          console.log('new order');
          order = await Order.create(newOrder);
        }
        res.status(200).json({ ...result, orderId: order._id });
      }
    }
    //
    //
    // handle order after payment
    if (req.method === 'PUT' && session) {
      const { paid, orderId, cartId } = req.body;
      const userOrder = await Order.findById(orderId);
      if (userOrder) {
        // filter items for printify
        const shipTo = userOrder.shipTo;
        const printifyProduct = userOrder.products.filter(
          (i) => i.provider === 'printify'
        );
        const lineItems = printifyProduct.map((i) => {
          return { sku: i.sku, quantity: i.quantity };
        });
        const externalId = userOrder._id;
        // submit order to printify
        const printifyOrder = await submitOrder(shipTo, lineItems, externalId);
        if (printifyOrder) {
          const printify_id = printifyOrder.id;
          console.log(printifyOrder);
          console.log(printify_id);
          // update order
          const update = {
            paid: paid,
            status: 'awaiting shipment',
            printify_id: printify_id,
          };
          const fullOrder = await Order.findByIdAndUpdate(orderId, update, {
            new: true,
          });
          // delete cart
          const deleteCart = await Cart.findByIdAndDelete(cartId);
          // send email
          await transporter.sendMail({
            from: email,
            to: fullOrder.shipTo.email,
            subject: `Thank you for ordering from ${webName}. your order number is ${fullOrder._id}`,
            text: `Hello ${fullOrder.shipTo.first_name}, thank you for your order. your order number is ${fullOrder._id}. feel free to contact us if you have any questions. click here to check your order status: ${url}/shop/checkout/confirm/${fullOrder._id}`,
            html: `<h1 style="text-align:center">Hello ${fullOrder.shipTo.first_name}</h1>
<h2 style="text-align:center">thank you for your order</h2>
<p style="text-align:center">your order number is ${fullOrder._id}. feel free to contact us if you have any questions.</p>
<p style="text-align:center"><a href="${url}/shop/checkout/confirm/${fullOrder._id}">click here to check your order status</a></p>`,
          });
          // res
          res.status(200).json(fullOrder);
        }
      }
    }
  } catch (err) {
    res.status(500).json(err);
  }
}
