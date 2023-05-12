import React, { useCallback, useEffect, useState } from 'react';
import { useProductsStore } from '@/store/productsStrore';
import axios from 'axios';
import Image from 'next/image';
import styles from '@/styles/Dashboard.module.css';
import { useAlertStore } from '@/store/alertStore';

const Printify = () => {
  // publish
  const publish = async (productId, publish) => {
    const url = process.env.NEXT_PUBLIC_URL;
    try {
      await axios.post(`${url}/api/products/printify`, {
        id: productId,
        publish: publish,
      });
      getAllProducts();
    } catch (error) {
      console.log(error);
    }
  };
  //

  const products = useProductsStore((state) => state.products);
  const getAllProducts = useCallback(() => {
    useProductsStore.getState().getAllProducts();
  }, []);

  useEffect(() => {
    getAllProducts();
  }, [getAllProducts]);
  return (
    <div>
      {' '}
      <p>
        Here you have a list of all of your products. you can hide and publish
        them as you like.
      </p>
      <p>
        the automatic print on dammend shop system works with{' '}
        <a href="https://printify.com/app/store/products" target="_blnak">
          Printify
        </a>
        . to create new products and manage your exicting products got to{' '}
        <a href="https://printify.com/app/store/products" target="_blnak">
          Printify
        </a>
      </p>
      <p>
        If you need any help, I wrote a little tutorial avilable here on the
        dashboard.{' '}
        <a href="#printify_tutorial">Click here to go to the tutorial</a>
      </p>
      <div className={styles.products_container}>
        {products &&
          products
            .filter((p) => p.provider === 'printify')
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
                    {!visible ? (
                      <>
                        <p>This product is not publishd</p> <br />
                        <button
                          onClick={() => publish(product.id, true)}
                          className="btn block-btn dark"
                        >
                          Publish now
                        </button>
                      </>
                    ) : (
                      <>
                        <p>This product is online</p> <br />
                        <button
                          onClick={() => publish(product.id, false)}
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
      <div className={styles.printify_tutorial}>
        <h1 id="printify_tutorial">printify tutorial</h1>
      </div>
    </div>
  );
};

export default Printify;
