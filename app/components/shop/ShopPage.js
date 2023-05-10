'use client';

import React, { useEffect, useState } from 'react';
import { useProductsStore } from '@/store/productsStrore';
import styles from '@/styles/Shop.module.css';
import Products from './Products';
import MainSection from '../MainSection';
import TitlesSection from '../TitlesSection';
import ShopMenu from './ShopMenu';
import LoadScreen from '../LoadScreen';
import PageSelector from './PageSelector';
import { useAlertStore } from '@/store/alertStore';
import { usePathname } from 'next/navigation';

const ShopPage = () => {
  const products = useProductsStore((state) => state.products);
  const getPublicProducts = useProductsStore(
    (state) => state.getPublicProducts
  );
  const [selectdProducts, setSelectdProducts] = useState([]);

  // router
  //   const router = useRouter();
  //   const query = router.query;
  //   useEffect(() => {
  //     if (query.tags) {
  //       setTags(query.tags);
  //     }
  //   }, [query.tags]);

  // handle tag filtering
  //   state
  const [tags, setTags] = useState([]);
  // set tags
  const handleTags = (tag) => {
    if (tags.includes(tag)) setTags(tags.filter((t) => t !== tag));
    else if (tags.includes(tag) == false) setTags([...tags, tag]);
  };
  // handle filter
  useEffect(() => {
    if (tags.length > 0) {
      setSelectdProducts(
        products.filter((i) => i.tags.some((item) => tags.includes(item)))
      );
    } else {
      setSelectdProducts(products);
    }
  }, [tags, products]);
  // setProducts
  useEffect(() => {
    setSelectdProducts(products);
  }, [products]);
  // getProducts
  useEffect(() => {
    if (products.length == 0) getPublicProducts();
  }, []);
  // pages
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState([1]);
  // set number of pages pages
  useEffect(() => {
    if (selectdProducts) {
      const postCount = selectdProducts.length;
      const pageCount = Math.ceil(postCount / 6);
      const pageArray = [];
      for (let i = 1; i <= pageCount; i++) {
        pageArray.push(i);
      }

      setPages(pageArray);
    }
  }, [selectdProducts]);

  //

  return (
    <>
      <div className={styles.shop}>
        <TitlesSection>
          <div className={`flex-column fade-in `}>
            <ShopMenu
              className={styles.container}
              tags={tags}
              setTags={setTags}
              handleTags={handleTags}
            />
          </div>
        </TitlesSection>
        <MainSection>
          {selectdProducts.length > 0 ? (
            <div className="flex-column">
              <div className={styles.products_container}>
                <Products products={selectdProducts} page={page} />
              </div>
              <PageSelector setPage={setPage} pages={pages} page={page} />
            </div>
          ) : (
            <LoadScreen />
          )}
        </MainSection>
      </div>
    </>
  );
};

export default ShopPage;
