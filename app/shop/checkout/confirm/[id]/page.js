// import { NextRequest } from 'next/server';
'use client';

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import styles from '@/styles/Shop.module.css';
import MainSection from '@/app/components/MainSection';
import TitlesSection from '@/app/components/TitlesSection';
import { useAlertStore } from '@/store/alertStore';
import { useUserStore } from '@/store/userStore';
import axios from 'axios';
import Image from 'next/image';
import { BsCheckCircle } from 'react-icons/bs';
import { CiLocationOn } from 'react-icons/ci';
import { useParams } from 'next/navigation';

const Confirm = () => {
  // session
  const { data: session } = useSession();

  // route
  const router = useParams();
  const orderId = router.id;
  const [post, setPost] = useState('');
  // state
  const [order, setOrder] = useState('');
  const [printifyOrder, setPrintifyOrder] = useState('');

  const user = useUserStore((state) => state.user);

  // get the order
  const getOrder = async () => {
    try {
      await axios
        .get(`/api/orders?id=${orderId}&userId=${user._id}`)
        .then((res) => {
          if (res.data) {
            setOrder(res.data.self);
            setPrintifyOrder(res.data.printify);
          }
        });
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (orderId && session) {
      getOrder();
    }
  }, [orderId, user]);
  return (
    <>
      <TitlesSection>
        <div className="continer">
          {order && (
            <div className="flex-column">
              <h2>
                <BsCheckCircle /> Thank you for your order,{' '}
                {order.shipTo.first_name}.
              </h2>
              <h3>your order number is {order._id}</h3>
            </div>
          )}
        </div>
      </TitlesSection>
      <MainSection>
        <div className="container">
          {order ? (
            <>
              <h2>Your order</h2>

              <div className={styles.delivery_info}>
                <ul>
                  <h3>
                    <CiLocationOn /> Shipping to
                  </h3>

                  <li>
                    {order.shipTo.first_name} {order.shipTo.last_name}
                  </li>
                  <li>
                    {order.shipTo.address1}, {order.shipTo.address2}
                  </li>
                  <li>{order.shipTo.city}</li>
                  <li>
                    {order.shipTo.region} ,{order.shipTo.country}
                  </li>
                </ul>
              </div>
              <div className={styles.order_cart}>
                <ul>
                  {order.products.map((product, index) => {
                    return (
                      <li key={index}>
                        <div className={styles.order_product_info}>
                          <h4>{product.title}</h4>
                          <h5>{product.colorAndSize}</h5>
                          <span>{product.sku}</span>
                          <span>
                            price: {(product.price / 100).toFixed(2)}$ X
                            {product.quantity}
                          </span>
                        </div>
                        <div className={styles.order_product_image}>
                          <Image
                            src={product.image}
                            alt={product.title}
                            fill
                            sizes="(max-width: 100rem) 100vw,
              (max-width: 100rem) 50vw,
              33vw"
                            priority
                          />
                        </div>
                      </li>
                    );
                  })}
                  <li className="flex-column">
                    <span>
                      shipping : {(order.shipping / 100).toFixed(2)}${' '}
                    </span>
                    <span>
                      total include shipping : {(order.total / 100).toFixed(2)}${' '}
                    </span>
                    {printifyOrder.shipments ? (
                      <>
                        <span>carrier: {printifyOrder.shipments.carrier}</span>
                        <span>
                          tracking number: {printifyOrder.shipments.number}
                        </span>
                        <span>status: {printifyOrder.status}</span>
                        <span>
                          chack order status: {printifyOrder.shipments.url}
                        </span>
                      </>
                    ) : (
                      <span>Order status :{order.status}</span>
                    )}
                  </li>
                </ul>
                <div className="continer flex-column">
                  <p>
                    Chack your email for updates about the order status. you can
                    also revisit this page to chack for updates{' '}
                  </p>
                </div>
              </div>
            </>
          ) : (
            <h1>No order. please go back</h1>
          )}
        </div>
      </MainSection>
    </>
  );
};

export default Confirm;
