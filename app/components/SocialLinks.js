import Link from 'next/link';
import React from 'react';
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillLinkedin,
} from 'react-icons/ai';
import { FaGithubSquare } from 'react-icons/fa';

const SocialLinks = () => {
  return (
    <ul>
      <li>
        <Link href={'/blog'}>
          <AiFillFacebook />
        </Link>
      </li>
      <li>
        <Link href={'/blog'}>
          <AiFillLinkedin />
        </Link>
      </li>
      <li>
        <Link href={'/blog'}>
          <FaGithubSquare />
        </Link>
      </li>
      <li>
        <Link href={'/blog'}>
          <AiFillInstagram />
        </Link>
      </li>
    </ul>
  );
};

export default SocialLinks;
