'use client';

import React, { useEffect, useState } from 'react';
import styles from '@/styles/Shop.module.css';
import { useCartStore } from '@/store/cartStore';
import { useUserStore } from '@/store/userStore';
import { useAlertStore } from '@/store/alertStore';
import CartItem from '../cart/CartItem';
import axios from 'axios';
import { useMenusStore } from '@/store/menuStore';
import { useCartMenuStore } from '@/store/cartMenuStore';
import Link from 'next/link';

const Cart = () => {
  const getUserCart = useCartStore((state) => state.getUserCart);
  const cart = useCartStore((state) => state.cart);
  const user = useUserStore((state) => state.user);
  const [cartTotal, setCartToatl] = useState(0);
  //

  // Calculate the total cost of the cart
  useEffect(() => {
    if (cart.products && cart.products.length > 0) {
      const total = cart.products.reduce((acc, product) => {
        return acc + product.price * product.quantity;
      }, 0);
      setCartToatl(total);
    }
  }, [cart]);
  // get cart items
  useEffect(() => {
    if (user._id) {
      getUserCart(user._id);
    }
  }, [user, getUserCart]);
  // REMOVE ITEM FROM CART
  const removeFromCart = async (product) => {
    try {
      await axios
        .patch(`/api/cart`, {
          userId: user._id,
          product: product,
        })
        .then(() => {
          getUserCart(user._id);
          showAlert('Item removed from the cart', 'success');
        });
    } catch (err) {
      console.log(err);
    }
  };
  // Chanfe quantity
  const updateCart = async (product) => {
    try {
      await axios
        .put(`/api/cart`, {
          userId: user._id,
          product: product,
        })
        .then(() => {
          console.log('cart update');
          getUserCart(user._id);
        });
    } catch (err) {
      console.log(err);
    }
  };

  // alerts
  const showAlert = useAlertStore((state) => state.showAlert);

  return (
    <div className={styles.cart_checkout}>
      <div className={`${styles.cart_inner} fade-in flex-column`}>
        {cart.products.length > 0 ? (
          <>
            {cart.products.map((product, index) => (
              <CartItem
                product={product}
                updateCart={updateCart}
                key={index}
                removeFromCart={removeFromCart}
              />
            ))}
            <div className={` ${styles.checkout_total} `}>
              <span>{`Total before shipping: ${(cartTotal / 100).toFixed(
                2
              )}$ `}</span>
            </div>
          </>
        ) : (
          <>
            <h2>No items in the cart</h2>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
