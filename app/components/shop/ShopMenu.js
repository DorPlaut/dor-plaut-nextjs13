'use client';

import React, { useEffect, useState } from 'react';
import { useProductsStore } from '@/store/productsStrore';
import styles from '@/styles/Shop.module.css';

const ShopMenu = ({ tags, setTags, handleTags }) => {
  const [filters, setFilters] = useState(['']);
  const products = useProductsStore((state) => state.products);
  const sortProducts = useProductsStore((state) => state.sortProducts);
  useEffect(() => {
    const arr = [];
    if (products) {
      products.map((i) => {
        i.tags.map((tag) => {
          arr.push(tag);
        });
      });
      setFilters(arr.filter((item, index) => arr.indexOf(item) === index));
    }
  }, [products]);

  const myTags = [
    'T-shirts',
    'Hoodies',
    'Accessories',
    'Hats',
    'Sportswear',
    "Women's Clothing",
    'Home & Living',
    'Other',
    'Made in USA',
  ];

  return (
    <div className={styles.menu}>
      <div className={styles.tags}>
        <span>Filter By :</span>
        <ul>
          <li>
            <button className="btn text-btn" onClick={() => setTags([])}>
              Show all
            </button>
          </li>
          {filters &&
            myTags.map((tag, index) => {
              return (
                <li key={index}>
                  <button
                    className="btn text-btn"
                    onClick={() => handleTags(tag)}
                    style={{
                      background: tags.includes(tag) && 'black',
                    }}
                  >
                    {tag}
                  </button>
                </li>
              );
            })}
        </ul>
      </div>
      {/* sort */}
      <div className={styles.sort}>
        <span>Sort By :</span>
        <ul>
          <li>
            <span>Price :</span>
            <button
              className="btn text-btn"
              onClick={() => {
                sortProducts('price', 'asc');
                setTags([...tags]);
              }}
            >
              Low
            </button>
            /
            <button
              className="btn text-btn "
              onClick={() => {
                sortProducts('price', 'desc');
                setTags([...tags]);
              }}
            >
              High
            </button>
          </li>
          <li>
            <span>Date Added :</span>
            <button
              className="btn text-btn"
              onClick={() => {
                sortProducts('date', 'desc');
                setTags([...tags]);
              }}
            >
              Old
            </button>
            /
            <button
              className="btn text-btn"
              onClick={() => {
                sortProducts('date', 'asc');
                setTags([...tags]);
              }}
            >
              New
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ShopMenu;
