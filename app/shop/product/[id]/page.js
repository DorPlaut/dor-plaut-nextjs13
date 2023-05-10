'use client';

import LoadScreen from '@/app/components/LoadScreen';
import MainSection from '@/app/components/MainSection';
import TitlesSection from '@/app/components/TitlesSection';
import { useProductsStore } from '@/store/productsStrore';
import styles from '@/styles/Section.module.css';
import FullPageProduct from '@/app/components/shop/product/FullPageProduct';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import React, { useEffect, useState } from 'react';

const Product = () => {
  // path

  const params = useParams();
  const productId = params.id;
  const [product, setProduct] = useState('');

  // pages
  //   state
  const products = useProductsStore((state) => state.products);
  const getPublicProducts = useProductsStore(
    (state) => state.getPublicProducts
  );

  // get products
  useEffect(() => {
    if (products.length === 0) {
      getPublicProducts();
    }
  }, []);

  //   filter products
  useEffect(() => {
    if (products) {
      products.map((p) => {
        if (p.provider === 'self' && p._id === productId) setProduct(p);
        if (p.provider === 'printify' && p.id === productId) setProduct(p);
      });
    }
  }, [productId, products, product]);

  return (
    <>
      <TitlesSection>
        <div className={`${styles.post_route_container}   flex-column fade-in`}>
          <div className={styles.post_route}>
            <span>
              <Link href={'/shop'}>
                <button className="btn text-btn ">Shop</button>
              </Link>{' '}
              {` -> `}{' '}
              <Link href={`/shop/product/${product.id}`}>
                <button className="btn text-btn ">{product.title}</button>
              </Link>
            </span>
            {/* <br />
                  <button className="btn block-btn bright">
                    Go Back to the blog
                  </button> */}
          </div>
        </div>
      </TitlesSection>
      <MainSection>
        {product ? <FullPageProduct product={product} /> : <LoadScreen />}
      </MainSection>
    </>
  );
};

export default Product;
