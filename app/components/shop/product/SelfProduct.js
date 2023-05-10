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

const SelfProduct = ({ product, index, isMini }) => {
  const { title, _id, variants, images, visible, price, provider } = product;
  const id = product._id;
  let img;
  if (images.length > 0) {
    img = images[0].src;
  } else {
    img = '/no_img.jpg';
  }
  // set variants
  const [selectedVariant, setSelectedVariant] = useState('');
  const [isAvailble, setIsAvailble] = useState(true);

  useEffect(() => {
    if (selectedVariant.is_available === false) {
      setIsAvailble(false);
    } else {
      setIsAvailble(true);
    }
  }, [selectedVariant]);

  //   user info
  const user = useUserStore((state) => state.user);
  const getUserCart = useCartStore((state) => state.getUserCart);
  // open menu and cart when adding an item
  const openMenu = useMenuStore((state) => state.openMenu);
  const openCart = useCartMenuStore((state) => state.openCart);

  // alerts
  const showAlert = useAlertStore((state) => state.showAlert);

  // ADD TO CART
  const addToCart = () => {
    console.log(user.username);
    if (!user.username) {
      showAlert('Please log in to use the shop', 'danger');
    } else if (variants.length > 1 && !selectedVariant) {
      showAlert('Please select color or size', 'danger');
    } else {
      console.log('add to cart');
      const regex = /^(?:undefined\s*-\s*)?(.*?)\s*-?\s*(?:undefined)?$/;
      const product = {
        title: title,
        provider: provider,
        colorAndSize: selectedVariant.title,
        sku: _id,
        price: price,
        image: img,
        quantity: 1,
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
          src={isAvailble ? img : '/outofstockBtn.png'}
          alt={title}
          fill
          sizes="(max-width: 100rem) 100vw,
              (max-width: 100rem) 50vw,
              33vw"
          priority
        />
      </div>
      {variants.length > 1 && (
        <div className={styles.color_selector}>
          <SizeSelector
            sizes={variants}
            setSize={setSelectedVariant}
            size={selectedVariant}
          />
        </div>
      )}
      <form action="">
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.product_btn_container}>
          <span className={styles.product_price + ' ' + 'block-btn black'}>
            {(price / 100).toFixed(2)}$
          </span>
          {!isMini && isAvailble && (
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

export default SelfProduct;
