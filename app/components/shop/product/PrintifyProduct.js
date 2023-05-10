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
import Link from 'next/link';
import { useMenuStore } from '@/store/menuStore';
import { useCartMenuStore } from '@/store/cartMenuStore';

const PrintifyProduct = ({ product, index, isMini }) => {
  const { title, id, options, variants, images, visible, provider } = product;

  const user = useUserStore((state) => state.user);
  const getUserCart = useCartStore((state) => state.getUserCart);
  // open menu and cart when adding an item
  const openMenu = useMenuStore((state) => state.openMenu);
  const openCart = useCartMenuStore((state) => state.openCart);

  // alerts
  const showAlert = useAlertStore((state) => state.showAlert);

  // set product details
  const [colors, setColors] = useState(['']);
  const [sizes, setSizes] = useState(['']);
  const [others, setOthers] = useState(['']);
  const [img, setImg] = useState('');

  useEffect(() => {
    if (images[0]) {
      setImg(images[0].src);
    } else {
      setImg('/outofstockBtn.png');
    }
  }, [images]);

  const [price, setPrice] = useState(['']);

  // variant selector
  const [sku, setSku] = useState('');
  const [color, setColor] = useState('');
  const [size, setSize] = useState('');
  const [other, setOther] = useState('');
  const [quantity, setQuantity] = useState(1);

  // set the options
  useEffect(() => {
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
  }, [product]);

  // find image
  function getImageUrl(variantId) {
    const image = images.find(
      (img) => img.variant_ids.includes(variantId) && img.is_default
    );
    return image ? image.src : image;
  }

  // get the selected product
  useEffect(() => {
    const selectedOptions = [size.id, color.id, other.id];
    const filter = selectedOptions.filter(Boolean);
    const variant = variants.find((variant) => {
      return filter.every((option) => {
        return variant.options.includes(option);
      });
    });

    if (variant && variant.is_available) {
      const imageUrl = variant ? getImageUrl(variant.id) : null;
      setImg(imageUrl);
      setPrice(variant.price);
      setSku(variant.sku);
    } else {
      setImg('/outofstockBtn.png');
      setSku('');
    }
  }, [size, color, other, product]);

  // ADD TO CART
  const addToCart = () => {
    console.log(user.username);
    if (!user.username) {
      showAlert('Please log in to use the shop', 'danger');
    } else if (
      (colors.length > 1 && !color) ||
      (sizes.length > 1 && !size) ||
      (others.length > 1 && !other)
    ) {
      showAlert('Please select color or size', 'danger');
    } else {
      console.log('add to cart');
      const regex = /^(?:undefined\s*-\s*)?(.*?)\s*-?\s*(?:undefined)?$/;
      const product = {
        title: title,
        provider: provider,
        colorAndSize: `${color.title} - ${size.title}`.match(regex)[1] || '',
        sku: sku,
        price: price,
        image: img,
        quantity: quantity,
      };
      PostToCart(product);
    }
  };

  //
  const PostToCart = async (product) => {
    try {
      await axios
        .post(`/api/cart`, {
          userId: user._id,
          product: product,
        })
        .then(() => {
          getUserCart(user._id);
          showAlert('Item added to cart', 'success');
          openMenu();
        });
    } catch (err) {
      console.log(err);
    }
  };
  //

  return (
    <div
      className={`${styles.product} fade-in`}
      style={{ animationDelay: `${index / 5}s` }}
    >
      <div className={`${styles.img} pump`}>
        {/* come back here to replace this with "no default image" image. */}
        <Image
          src={img ? img : setImg('/outofstockBtn.png')}
          alt={title}
          fill
          sizes="(max-width: 100rem) 100vw,
              (max-width: 100rem) 50vw,
              33vw"
          priority
        />
      </div>
      {isMini || (
        <>
          {' '}
          {colors.length > 1 && (
            <div className={styles.color_selector}>
              <ColorSelector
                colors={colors}
                setColor={setColor}
                color={color}
              />
            </div>
          )}
          {sizes.length > 1 && (
            <div className={styles.color_selector}>
              <SizeSelector sizes={sizes} setSize={setSize} size={size} />
            </div>
          )}
        </>
      )}
      <form action="">
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.product_btn_container}>
          <span className={styles.product_price + ' ' + 'block-btn black'}>
            {(price / 100).toFixed(2)}$
          </span>
          {sku && !isMini && (
            <button
              className="btn block-btn bright"
              onClick={(e) => {
                e.preventDefault();
                addToCart();
                openCart();
              }}
            >
              Add to cart
            </button>
          )}
          <Link href={`/shop/product/${id}`}>
            <button className="btn block-btn bright pump">More details</button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default PrintifyProduct;
