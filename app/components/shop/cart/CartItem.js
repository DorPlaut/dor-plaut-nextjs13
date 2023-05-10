'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from '@/styles/Shop.module.css';
import { useAlertStore } from '@/store/alertStore';

const CartItem = ({ product, removeFromCart, updateCart }) => {
  const { colorAndSize, image, price, quantity, sku, title, _id } = product;

  // handle quantitiy changes
  const [newQuantity, setNewQuantity] = useState(quantity);

  const handleQuantity = (action) => {
    if (action === '+') {
      setNewQuantity(newQuantity + 1);
      updateCart({ ...product, quantity: newQuantity + 1 });
    } else {
      if (newQuantity > 1) {
        setNewQuantity(newQuantity - 1);
        updateCart({ ...product, quantity: newQuantity - 1 });
      }
    }
  };

  const showAlert = useAlertStore((state) => state.showAlert);

  return (
    <div className={`${styles.cart_item} flex-row`}>
      <div className={styles.cart_item_info}>
        <h4
          onClick={() => {
            showAlert('hello', 'success');
          }}
        >
          {title}
        </h4>
        <h5>{colorAndSize}</h5>
        <span>{sku}</span> <br />
        <span className={styles.item_price}>
          {((price * quantity) / 100).toFixed(2)}$
        </span>
      </div>

      <div className={`${styles.quantity} ${styles.quantity_cart}`}>
        <button
          type="button"
          className="btn  bright"
          onClick={() => handleQuantity('+')}
        >
          +
        </button>
        <div id="quantity" readOnly>
          {newQuantity}
        </div>
        <button
          type="button"
          className="btn  bright"
          onClick={() => handleQuantity('-')}
        >
          -
        </button>
      </div>

      <div className={styles.cart_img}>
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 100rem) 100vw,
              (max-width: 100rem) 50vw,
              33vw"
          priority
        />
        <div
          className={`${styles.delete_btn} btn bright flex-row`}
          onClick={() => removeFromCart(product)}
        >
          X
        </div>
      </div>
    </div>
  );
};

export default CartItem;
