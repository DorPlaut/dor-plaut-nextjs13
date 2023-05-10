import getProducts from '@/utils/getProducts.js';
import axios from 'axios';

export default async function handler(req, res) {
  const tokken = process.env.PRINTFY_TOKEN;
  const shopID = process.env.SHOP_ID;
  const url = process.env.URL;
  try {
    // publish/unpublish products
    if (req.method === 'POST') {
      const { id, publish } = req.body;
      console.log(id, publish);
      //
      // PUBLISH PRODUCT
      //
      if (publish) {
        // // publish
        await axios
          .post(
            `https://api.printify.com/v1/shops/${shopID}/products/${id}/publish.json`,
            {
              title: true,
              description: true,
              images: true,
              variants: true,
              tags: true,
              keyFeatures: true,
              shipping_template: true,
            },
            {
              headers: {
                Authorization: `Bearer ${tokken}`,
              },
            }
          )
          .then((res) => {
            console.log('Publish product');
          });
        // set publish status to sucssess
        await axios
          .post(
            `https://api.printify.com/v1/shops/${shopID}/products/${id}/publishing_succeeded.json`,
            {
              external: {
                id: id,
                handle: `${url}/shop`,
              },
            },
            {
              headers: {
                Authorization: `Bearer ${tokken}`,
              },
            }
          )
          .then((res) => {
            console.log(res.data);
            console.log('Publish product - success');
          });
        // set visible
        await axios
          .put(
            `https://api.printify.com/v1/shops/${shopID}/products/${id}.json`,
            {
              visible: true,
            },
            {
              headers: {
                Authorization: `Bearer ${tokken}`,
              },
            }
          )
          .then((res) => {
            console.log('set visible: true');
          });

        // UNPUBLISH PRODUCT
        //
      } else if (publish === false) {
        // unpublish
        await axios
          .post(
            `https://api.printify.com/v1/shops/${shopID}/products/${id}/unpublish.json`,
            {},
            {
              headers: {
                Authorization: `Bearer ${tokken}`,
              },
            }
          )
          .then((res) => {
            console.log('unpublish product');
          });
        // set unvisible
        await axios
          .put(
            `https://api.printify.com/v1/shops/${shopID}/products/${id}.json`,
            {
              visible: false,
            },
            {
              headers: {
                Authorization: `Bearer ${tokken}`,
              },
            }
          )
          .then((res) => {
            console.log('set visible: false');
          });
      }
      res.status(200).json('');
    }
    // get all
    if (req.method === 'GET') {
      const products = await getProducts();
      res.status(200).json(products);
    }
  } catch (err) {
    console.log(err);
  }
}
