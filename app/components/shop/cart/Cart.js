'use client';

import React, { useEffect, useState } from 'react';
import styles from '@/styles/Shop.module.css';
import { useCartStore } from '@/store/cartStore';
import { useUserStore } from '@/store/userStore';
import { useAlertStore } from '@/store/alertStore';
import CartItem from './CartItem';
import axios from 'axios';
import { useCartMenuStore } from '@/store/cartMenuStore';
import { useMenuStore } from '@/store/menuStore';
import Link from 'next/link';

const Cart = () => {
  const getUserCart = useCartStore((state) => state.getUserCart);
  const cart = useCartStore((state) => state.cart);
  const user = useUserStore((state) => state.user);
  const [cartTotal, setCartToatl] = useState(0);
  // menu control
  const isCartOpen = useCartMenuStore((state) => state.isCartOpen);
  const closeCart = useCartMenuStore((state) => state.closeCart);
  const closeMenu = useMenuStore((state) => state.closeMenu);

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
        .delete(`/api/cart`, {
          data: {
            userId: user._id,
            product: product,
          },
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
    <div
      className={`${styles.cart} ${
        isCartOpen ? styles.cart_open : styles.cart_close
      }`}
    >
      {isCartOpen &&
        (cart.products.length > 0 ? (
          <div className={`${styles.cart_inner} fade-in flex-column`}>
            {cart.products.map((product, index) => (
              <CartItem
                product={product}
                updateCart={updateCart}
                key={index}
                removeFromCart={removeFromCart}
              />
            ))}
            <div className={` ${styles.full_price} ${styles.cart_total}`}>
              <Link
                className="btn block-btn bright"
                href={`/shop/checkout/${cart._id}`}
                onClick={() => {
                  closeCart();
                  closeMenu();
                }}
              >
                Checkout
              </Link>
              <span>{`Total: ${(cartTotal / 100).toFixed(2)}$ `}</span>
            </div>
          </div>
        ) : (
          <div className={`${styles.cart_inner} fade-in flex-column`}>
            <h1>cart is empty</h1>
          </div>
        ))}
    </div>
  );
};

export default Cart;
