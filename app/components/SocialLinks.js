import Link from 'next/link';
import React from 'react';
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillLinkedin,
} from 'react-icons/ai';
import {
  FaGithubSquare,
  FaFacebookSquare,
  FaLinkedin,
  FaInstagramSquare,
} from 'react-icons/fa';
import { RiInstagramFill } from 'react-icons/ri';

const SocialLinks = () => {
  return (
    <ul>
      <li>
        <Link href={'/blog'}>
          <FaLinkedin />
        </Link>
      </li>
      <li>
        <Link href={'/blog'}>
          <FaGithubSquare />
        </Link>
      </li>
      <li>
        <Link href={'/blog'}>
          <FaInstagramSquare />
        </Link>
      </li>
      <li>
        <Link href={'/blog'}>
          <FaFacebookSquare />
        </Link>
      </li>
    </ul>
  );
};

export default SocialLinks;
