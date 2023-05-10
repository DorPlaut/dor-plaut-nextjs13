'use client';

import React, { useEffect, useState } from 'react';
import styles from '@/styles/Shop.module.css';
import Image from 'next/image';
import ColorSelector from './ColorSelector';
import SizeSelector from './SizeSelector';
import { useUserStore } from '@/store/userStore';
import { useCartStore } from '@/store/cartStore';
import axios from 'axios';
import { useAlertStore } from '@/store/alertStore';
import ImagesGallery from '../../ImagesGallery';
import parse from 'html-react-parser';
import { useMenuStore } from '@/store/menuStore';
import { useCartMenuStore } from '@/store/cartMenuStore';

const FullPageProduct = ({ product }) => {
  const {
    title,
    description,
    id,
    options,
    variants,
    images,
    visible,
    provider,
  } = product;

  const user = useUserStore((state) => state.user);
  const getUserCart = useCartStore((state) => state.getUserCart);

  // alerts
  const showAlert = useAlertStore((state) => state.showAlert);

  // set product details
  const [colors, setColors] = useState(['']);
  const [sizes, setSizes] = useState(variants);
  const [others, setOthers] = useState(['']);
  const [variantImages, setVariantImages] = useState([]);
  const [price, setPrice] = useState(['']);

  // variant selector
  const [sku, setSku] = useState('');
  const [color, setColor] = useState('');
  const [size, setSize] = useState('');
  const [other, setOther] = useState('');
  const [quantity, setQuantity] = useState(1);

  // set the options
  useEffect(() => {
    if (provider === 'printify') {
      setSizes([]);
      setSize('');
      setColors([]);
      setColor('');
      options.forEach((option) => {
        if (option.type === 'color') {
          setColors(option.values);
        }
        if (option.type === 'size') {
          setSizes(option.values);
        } else {
          setOther(option.values);
        }
      });
    }
  }, [options, product]);

  // handle quantitiy changes

  const handleQuantity = (action) => {
    if (action === '+') {
      setQuantity(quantity + 1);
    } else {
      if (quantity > 1) {
        setQuantity(quantity - 1);
      }
    }
  };

  // get the selected product
  useEffect(() => {
    if (provider === 'printify') {
      const selectedOptions = [size.id, color.id, other.id];
      const filter = selectedOptions.filter(Boolean);
      const variant = variants.find((variant) => {
        return filter.every((option) => {
          return variant.options.includes(option);
        });
      });

      if (variant && variant.is_available) {
        setVariantImages(
          images.filter((i) => i.variant_ids.includes(variant.id))
        );
        setPrice(variant.price);
        setSku(variant.sku);
      } else {
        setVariantImages([{ src: '/outofstockBtn.png' }]);
        setSku('');
      }
    } else {
      setPrice(product.price);
    }
  }, [size, color, other, product]);

  // ADD TO CART
  const addToCart = () => {
    if (
      (colors.length > 1 && !color) ||
      (sizes.length > 1 && !size) ||
      (others.length > 1 && !other)
    ) {
      showAlert('Please select color or size', 'danger');
    } else {
      console.log('add to cart');
      const regex = /^(?:undefined\s*-\s*)?(.*?)\s*-?\s*(?:undefined)?$/;
      const newProduct = {
        title: title,
        provider: provider,
        colorAndSize: `${color.title} - ${size.title}`.match(regex)[1] || '',
        sku:
          provider === 'printify'
            ? sku
            : sizes.length > 1
            ? size._id
            : product._id,
        price: price,
        image: provider === 'printify' ? variantImages[0].src : images[0].src,
        quantity: quantity,
      };
      PostToCart(newProduct);
    }
  };

  //
  const PostToCart = async (newProduct) => {
    try {
      await axios
        .post(`/api/cart`, {
          userId: user._id,
          product: newProduct,
        })
        .then(() => {
          getUserCart(user._id);
          showAlert('Item added to cart', 'success');
          openMenu();
          openCart();
        });
    } catch (err) {
      console.log(err);
    }
  };
  //
  // open menu and cart when adding an item
  const openMenu = useMenuStore((state) => state.openMenu);
  const openCart = useCartMenuStore((state) => state.openCart);

  // set availblty for self provided products
  const [selectedVariant, setSelectedVariant] = useState('');
  const [isAvailble, setIsAvailble] = useState(true);
  useEffect(() => {
    if (size.is_available === false) {
      setIsAvailble(false);
    } else {
      setIsAvailble(true);
    }
  }, [size]);

  return (
    <div className={`${styles.fullProduct} fade-in container`}>
      <div className={styles.full_page_img}>
        <ImagesGallery
          photos={
            provider === 'printify'
              ? variantImages.map((i) => i.src)
              : images.map((i) => i.src)
          }
        />
      </div>
      {/* product info */}
      <div className={`flex-column ${styles.info_container} `}>
        <div className={styles.product_info}>
          <h2 className={styles.product_title}>{title}</h2>
          {/*  */}
          {parse(description)}
          <span className={styles.full_price}>{(price / 100).toFixed(2)}$</span>
        </div>

        {/* form */}
        <form action="">
          {/* option menu */}
          {variants.length > 1 && (
            <div className={styles.full_menu}>
              {colors.length > 1 && (
                <>
                  {' '}
                  <label>color</label>
                  <div
                    className={`${styles.color_selector}  ${styles.color_selector_full}`}
                  >
                    <ColorSelector
                      colors={colors}
                      setColor={setColor}
                      color={color}
                    />
                  </div>
                </>
              )}
              {sizes.length > 1 && (
                <>
                  <label>size</label>
                  <div
                    className={`${styles.color_selector}  ${styles.color_selector_full}`}
                  >
                    <SizeSelector sizes={sizes} setSize={setSize} size={size} />
                  </div>
                </>
              )}

              {/*  */}
            </div>
          )}

          <div className={styles.full_product_btn_container}>
            {(provider === 'self' && isAvailble) || sku ? (
              <>
                {/* quantity */}
                {/* <label htmlFor="quantity">Quantity</label> */}
                <div className={styles.quantity}>
                  <button
                    type="button"
                    className="btn  bright"
                    onClick={() => handleQuantity('+')}
                  >
                    +
                  </button>
                  <div id="quantity" readOnly>
                    {quantity}
                  </div>
                  <button
                    type="button"
                    className="btn  bright"
                    onClick={() => handleQuantity('-')}
                  >
                    -
                  </button>
                </div>

                <button
                  className="btn block-btn bright"
                  onClick={(e) => {
                    e.preventDefault();
                    addToCart();
                  }}
                >
                  Add to cart
                </button>
              </>
            ) : (
              <button
                onClick={(e) => e.preventDefault()}
                className="btn block-btn bright"
              >
                Out of stock - try and select another variant
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default FullPageProduct;
