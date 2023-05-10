'use client';

import React, { useEffect, useState } from 'react';
import { useProductsStore } from '@/store/productsStrore';
import styles from '@/styles/Shop.module.css';
import PrintifyProduct from './product/PrintifyProduct';
import SelfProduct from './product/SelfProduct';

const Products = ({ products, page }) => {
  return (
    products &&
    products.slice((page - 1) * 6, page * 6).map((product, index) => {
      if (product.provider === 'printify') {
        return (
          <PrintifyProduct
            product={product}
            key={index}
            index={index}
            isMini={false}
          />
        );
      }
      if (product.provider === 'self') {
        return (
          <SelfProduct
            product={product}
            key={index}
            index={index}
            isMini={false}
          />
        );
      }
    })
  );
};

export default Products;
