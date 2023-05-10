'use client';

import React from 'react';
import styles from '@/styles/Shop.module.css';

const SizeSelector = ({ sizes, setSize, size }) => {
  // handleClick

  return (
    sizes.length > 1 &&
    sizes.map((item, index) => {
      return (
        <div
          key={index}
          onClick={() => setSize(item)}
          className={styles.size_block}
          style={{ outline: item == size ? 'solid 2px white' : '' }}
        >
          <span>{item.title}</span>
        </div>
      );
    })
  );
};

export default SizeSelector;
