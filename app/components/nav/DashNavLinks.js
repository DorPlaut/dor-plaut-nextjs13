import React from 'react';
import Link from 'next/link';

const DashNavLinks = () => {
  return (
    <ul>
      <li>
        <Link href={'/dashboard'} scroll={false}>
          <button className="btn nav-btn bright">Dashboard</button>
        </Link>
      </li>
      <li>
        <Link href={'/dashboard/pages'} scroll={false}>
          <button className="btn nav-btn bright">Pages</button>
        </Link>
      </li>
      <li>
        <Link href={'/dashboard/blog'}>
          <button className="btn nav-btn bright">Blog</button>
        </Link>
      </li>
      <li>
        <Link href={'/dashboard/shop'}>
          <button className="btn nav-btn bright">Shop</button>
        </Link>
      </li>
      <li>
        <Link href={'/'}>
          <button className="btn nav-btn bright">Back to the website</button>
        </Link>
      </li>
    </ul>
  );
};

export default DashNavLinks;
