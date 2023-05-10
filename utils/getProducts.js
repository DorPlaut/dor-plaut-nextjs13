import axios from 'axios';

const tokken = process.env.PRINTFY_TOKEN;
const shopID = process.env.SHOP_ID;

const getProducts = async () => {
  try {
    const data = await axios.get(
      `https://api.printify.com/v1/shops/${shopID}/products.json`,
      {
        headers: {
          Authorization: `Bearer ${tokken}`,
        },
      }
    );
    const fullRawData = data.data.data;
    // specific data parts

    // clean the products data
    let products = [];
    fullRawData.map((item, index) => {
      //  CLEAN THE VARIANTS
      let variants = [];
      item.variants.map((variant) => {
        if (variant.is_enabled) variants.push(variant);
      });
      // CLEAN THE OPTIONS
      let optionIds = new Set(variants.flatMap((v) => v.options));
      let options = item.options
        .map((option) => ({
          ...option,
          values: option.values.filter((value) => optionIds.has(value.id)),
        }))
        .filter((option) => option.values.length > 0);

      // Push the products with the new keys
      products.push({
        ...item,
        variants: variants,
        options: options,
        provider: 'printify',
      });
    });

    return products;

    // return vlaues;
  } catch (err) {
    console.log(err);
  }
};

module.exports = getProducts;
