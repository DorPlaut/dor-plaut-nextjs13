'use client';
import Link from 'next/link';
import { useMobileStore } from '@/store/mobileStore';
import { usePathname } from 'next/navigation';
const NavLinks = () => {
  const path = usePathname();
  const isMobile = useMobileStore((state) => state.isMobile);
  return (
    <ul>
      {isMobile || (
        <li>
          <Link href={'/#home'} scroll={false}>
            <button
              className={`btn nav-btn bright ${path === '/' && 'active-nav'}`}
            >
              Home
              <div className="btn-underline"></div>
            </button>
          </Link>
        </li>
      )}

      <li>
        <Link href={'/#about'} scroll={false}>
          <button
            className={`btn nav-btn bright ${
              path.startsWith('/#about') && 'active-nav'
            }`}
          >
            About<div className="btn-underline"></div>
          </button>
        </Link>
      </li>
      <li>
        <Link href={'/blog'}>
          <button
            className={`btn nav-btn bright ${
              path.startsWith('/blog') && 'active-nav'
            }`}
          >
            Blog<div className="btn-underline"></div>
          </button>
        </Link>
      </li>
      <li>
        <Link href={'/shop'}>
          <button
            className={`btn nav-btn bright ${
              path.startsWith('/shop') && 'active-nav'
            }`}
          >
            {' '}
            Shop<div className="btn-underline"></div>
          </button>
        </Link>
      </li>
      <li>
        <Link href={'/contact'}>
          <button
            className={`btn nav-btn bright ${
              path.startsWith('/contact') && 'active-nav'
            }`}
          >
            Contact<div className="btn-underline"></div>
          </button>
        </Link>
      </li>
    </ul>
  );
};

export default NavLinks;
