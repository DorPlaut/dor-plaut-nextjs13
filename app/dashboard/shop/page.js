'use client';
import React, { useState } from 'react';
import styles from '@/styles/Dashboard.module.css';
import AddProduct from '@/app/components/dashboard/shop/AddProduct';
import { useAlertStore } from '@/store/alertStore';
import Printify from '@/app/components/dashboard/shop/Printify';
import AllProducts from '@/app/components/dashboard/shop/AllProducts';
import EditProduct from '@/app/components/dashboard/shop/EditProduct';
import AllOrders from '@/app/components/dashboard/shop/orders/AllOrders';

const Btn = ({ text, page, setPage }) => {
  return (
    <li>
      <button className="btn block-btn bright" onClick={() => setPage(page)}>
        {text}
      </button>
    </li>
  );
};

const Shop = () => {
  // set page
  const [page, setPage] = useState('dash');
  // set product to edit
  const [product, setProduct] = useState('');

  return (
    <>
      <div className={styles.dashboard}>
        <h1>Shop Dashboard</h1>
        <div className={styles.shop_nav}>
          <ul>
            <Btn
              text={'Add self provided Product'}
              page={'addProduct'}
              setPage={setPage}
            />
            <Btn
              text={'Manage self provided Products'}
              page={'allProducts'}
              setPage={setPage}
            />
            <Btn
              text={'Manage Printify shop'}
              page={'printify'}
              setPage={setPage}
            />
            <Btn text={' Manage Orders'} page={'orders'} setPage={setPage} />
          </ul>
        </div>
        <div>
          {page === 'dash' && (
            <AllProducts setPage={setPage} setProduct={setProduct} />
          )}
          {page === 'allProducts' && (
            <AllProducts setPage={setPage} setProduct={setProduct} />
          )}
          {page === 'addProduct' && (
            <AddProduct page={page} setPage={setPage} />
          )}
          {page === 'editProduct' && (
            <EditProduct page={page} setPage={setPage} product={product} />
          )}
          {page === 'printify' && <Printify setPage={setPage} />}
          {page === 'orders' && <AllOrders setPage={setPage} />}
        </div>
      </div>
    </>
  );
};

export default Shop;
