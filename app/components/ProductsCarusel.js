'use client';

import React, { useEffect, useState } from 'react';
import Carousel from 'nuka-carousel';
import Product from './shop/product/PrintifyProduct';
import { useProductsStore } from '@/store/productsStrore';
import { useMobileStore } from '@/store/mobileStore';
import LoadScreen from './LoadScreen';
import PrintifyProduct from './shop/product/PrintifyProduct';
import SelfProduct from './shop/product/SelfProduct';
import Link from 'next/link';

function ProductsCarusel({}) {
  const isMobile = useMobileStore((state) => state.isMobile);
  const products = useProductsStore((state) => state.products);
  const getPublicProducts = useProductsStore(
    (state) => state.getPublicProducts
  );
  const [selectdProducts, setSelectdProducts] = useState([]);
  // setProducts
  useEffect(() => {
    setSelectdProducts(products.filter((product) => product.visible));
  }, [products]);
  useEffect(() => {
    if (products.length === 0) {
      getPublicProducts();
    }
  }, []);
  return (
    <>
      <Link href={'/shop'} scroll={false}>
        <button className="btn block-btn bright float">Go to the Shop</button>
      </Link>
      <Carousel
        className="carusel"
        autoplay
        autoplayInterval={4000}
        wrapAround={true}
        slidesToShow={isMobile ? 2 : 3}
        defaultControlsConfig={{
          nextButtonText: '>',
          prevButtonText: '<',
          nextButtonStyle: {
            borderRadius: '50%',
            height: '3rem',
            width: '3rem',
            transform: 'translateX(1.5rem)',
          },
          prevButtonStyle: {
            borderRadius: '50%',
            height: '3rem',
            width: '3rem',
            transform: 'translateX(-1.5rem)',
          },
          pagingDotsStyle: {
            display: 'none',
          },
        }}
      >
        {products.length > 1 ? (
          selectdProducts.map((product, index) => {
            if (product.provider === 'printify') {
              return (
                <div key={index} className="carusel-object">
                  <PrintifyProduct
                    isMini={true}
                    product={product}
                    index={index}
                  />
                </div>
              );
            }
            if (product.provider === 'self') {
              return (
                <div key={index} className="carusel-object">
                  <SelfProduct isMini={true} product={product} index={index} />
                </div>
              );
            }
          })
        ) : (
          <LoadScreen />
        )}
      </Carousel>
    </>
  );
}

export default ProductsCarusel;
