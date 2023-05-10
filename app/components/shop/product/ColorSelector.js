'use client';

import React from 'react';
import styles from '@/styles/Shop.module.css';

const ColorSelector = ({ colors, setColor, color }) => {
  // calculate position
  const selectorPosition = (index) => {
    const length = colors.length;
    if (length % 2 === 0) {
      if (index < length / 2) return index;
      if (index >= length / 2) return length - 1 - index;
    } else {
      if (index < length / 2) return index;
      if (index === length / 2) return 0;
      if (index > length / 2) return length - 1 - index;
    }
  };

  return (
    colors.length > 1 &&
    colors.map((item, index) => {
      if (item.colors.length > 1) {
        return (
          <div key={index} onClick={() => setColor(item)}>
            <div
              className={styles.color_block}
              style={{
                background: `${item.colors[0]}`,
                outline: item == color ? 'solid 2px white' : '',
              }}
            >
              <div
                className={styles.color_block_half}
                style={{ background: `${item.colors[1]}` }}
              ></div>
            </div>
          </div>
        );
      } else {
        return (
          <div
            key={index}
            onClick={() => setColor(item)}
            className={styles.color_block}
            style={{
              background: `${item.colors[0]}`,
              outline: item == color ? 'solid 2px white' : '',
              // transform: `translateY(${selectorPosition(index)}rem)`,
            }}
          ></div>
        );
      }
    })
  );
};

export default ColorSelector;
