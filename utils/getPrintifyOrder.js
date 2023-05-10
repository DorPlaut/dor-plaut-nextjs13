import axios from 'axios';

const tokken = process.env.PRINTFY_TOKEN;
const shopID = process.env.SHOP_ID;

async function getPrintifyOrder(orderId) {
  const setUrl = () => {
    if (!orderId)
      return `https://api.printify.com/v1/shops/${shopID}/orders.json`;
    else
      return `https://api.printify.com/v1/shops/${shopID}/orders/${orderId}.json`;
  };
  const url = setUrl();
  try {
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${tokken}`,
      },
    });
    return res.data;
  } catch (err) {
    console.log(err);
  }
}

module.exports = { getPrintifyOrder };
