import React, { useCallback, useEffect, useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import Head from 'next/head';
import { useProductsStore } from '@/store/productsStrore';
import axios from 'axios';
import Image from 'next/image';
import styles from '@/styles/Dashboard.module.css';
import AddProduct from '@/components/dashboard/shop/AddProduct';
import { useAlertStore } from '@/store/alertStore';

const AllProducts = ({ setPage, setProduct }) => {
  const products = useProductsStore((state) => state.products);
  const getAllProducts = useCallback(() => {
    useProductsStore.getState().getAllProducts();
  }, []);

  useEffect(() => {
    getAllProducts();
  }, [getAllProducts]);

  // alerts
  const showAlert = useAlertStore((state) => state.showAlert);

  // publish
  const publish = async (product, publish) => {
    const Update = {
      ...product,
      visible: publish,
    };
    console.log(Update);
    try {
      await axios.put(`/api/products`, Update).then(() => {
        getAllProducts();
        showAlert('Product updated successfully', 'success');
      });
    } catch (error) {
      console.log(error);
      showAlert('error', 'danger');
    }
  };
  //
  // Delete product
  const deleteProduct = async (id) => {
    try {
      await axios.delete(`/api/products`, { data: { id: id } }).then(() => {
        getAllProducts();
        showAlert('Product deleted successfully', 'success');
      });
    } catch (error) {
      console.log(error);
      showAlert('error', 'danger');
    }
  };

  return (
    <div>
      <h2>Products</h2>
      <h3>Manage your shop</h3>
      <div className={styles.products_container}>
        {products &&
          products
            .filter((p) => p.provider === 'self')
            .map((product, index) => {
              let visible = true;
              if (product.visible === false || product.is_locked)
                visible = false;
              return (
                <div
                  className={styles.product}
                  key={index}
                  style={{
                    background: !visible && 'DarkRed',
                    color: !visible && 'white',
                  }}
                >
                  <div className={styles.product_details}>
                    <h3>{product.title}</h3>
                    <br />
                    <button
                      className="btn block-btn dark"
                      onClick={() => {
                        setProduct(product);
                        setPage('editProduct');
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="btn block-btn dark"
                      onClick={() => {
                        deleteProduct(product._id);
                      }}
                    >
                      Delete
                    </button>
                    {!visible ? (
                      <>
                        <p>This product is not publishd</p>
                        <button
                          onClick={() => publish(product, true)}
                          className="btn block-btn dark"
                        >
                          Publish now
                        </button>
                      </>
                    ) : (
                      <>
                        <p>This product is online</p>
                        <button
                          onClick={() => publish(product, false)}
                          className="btn block-btn dark"
                        >
                          Unpublish
                        </button>
                      </>
                    )}
                  </div>

                  <div className={styles.product_img}>
                    <Image
                      src={product.images[0].src}
                      alt={product.title}
                      fill
                      sizes="(max-width: 100rem) 100vw,
              (max-width: 100rem) 50vw,
              33vw"
                      priority
                    />
                  </div>
                </div>
              );
            })}
      </div>
    </div>
  );
};

export default AllProducts;
