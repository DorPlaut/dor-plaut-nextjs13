'use client';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useUserStore } from '@/store/userStore';
import { useMenuStore } from '@/store/menuStore';
import { useEffect } from 'react';
import axios from 'axios';
import NavLinks from './NavLinks';
import {
  BsChevronDoubleDown,
  BsChevronDoubleUp,
  BsChevronDoubleRight,
  BsChevronDoubleLeft,
} from 'react-icons/bs';
import styles from '@/styles/Nav.module.css';

export default function Login() {
  // user menu state
  const isMenuOpen = useMenuStore((state) => state.isMenuOpen);
  const clickMenu = useMenuStore((state) => state.clickMenu);
  //
  // get the current user after a login/loguot
  const getUser = useUserStore((state) => state.getUser);
  const user = useUserStore((state) => state.user);
  const getCurrentUser = async (email, provider) => {
    const url = process.env.NEXT_PUBLIC_URL;
    try {
      await axios
        .get(`/api/user?email=${email}&provider=${provider}`)
        .then((res) => {
          getUser(res.data.user);
        });
    } catch (err) {
      console.log(err);
    }
  };
  // get session details
  const { data: session } = useSession();
  // use effect
  useEffect(() => {
    if (session && user.email != session.user.email) {
      getCurrentUser(session.user.email, session.user.provider);
    }
  }, [session]);
  return (
    <>
      {session ? (
        <>
          <button
            className={`btn nav-btn bright ${isMenuOpen && 'active-nav'}`}
            onClick={() => {
              clickMenu();
            }}
          >
            <div className="flex-row">
              {user.username}
              {isMenuOpen ? (
                <BsChevronDoubleRight className={`${styles.menu_icon} jump`} />
              ) : (
                <BsChevronDoubleLeft className={`${styles.menu_icon} jump`} />
              )}
            </div>

            <div className="btn-underline"></div>
          </button>
          <NavLinks />
        </>
      ) : (
        <button className={'btn nav-btn bright'} onClick={() => signIn()}>
          Sign in
          <div className="btn-underline"></div>
        </button>
      )}
    </>
  );
}
