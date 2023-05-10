import React, { useState } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';

import Link from 'next/link';
import { useUserStore } from '@/store/userStore';
import styles from '@/styles/Nav.module.css';
import Cart from '../shop/cart/Cart';
import { useMenuStore } from '@/store/menuStore';
import { useCartMenuStore } from '@/store/cartMenuStore';

const NavLinks = () => {
  // user menu state
  const isCartOpen = useCartMenuStore((state) => state.isCartOpen);
  const isMenuOpen = useMenuStore((state) => state.isMenuOpen);
  const clickCart = useCartMenuStore((state) => state.clickCart);
  // user;
  const user = useUserStore((state) => state.user);
  return (
    <div
      className={styles.userNav}
      style={{
        transform: isMenuOpen
          ? 'translateX(2px)'
          : 'translateX(calc(var(--navWidth) + 3px))',
      }}
    >
      <ul>
        {user.isAdmin && (
          <li>
            <Link href={'/dashboard'} scroll={false}>
              <button className="btn block-btn dark">Dashboard</button>
            </Link>
          </li>
        )}
        {/* </ul>
      <ul> */}
        <li>
          <button
            className={` btn block-btn dark ${isCartOpen && 'user-btn-active'}`}
            onClick={clickCart}
          >
            Cart
          </button>
        </li>

        <li>
          <Cart />
        </li>

        <li>
          <Link href={'/'} scroll={false}>
            <button className="btn block-btn dark" onClick={() => signOut()}>
              Logout
            </button>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default NavLinks;
