'use client';

import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import styles from '@/styles/Shop.module.css';
import axios from 'axios';

const paypalId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;

const PaypalBtn = ({
  totalCost,
  items,
  address,
  orderId,
  shippingCost,
  cart,
}) => {
  const handlePayment = async () => {
    try {
      await axios
        .put(`/api/orders`, {
          orderId: orderId,
          cartId: cart._id,
          paid: true,
        })
        .then((res) => {
          location.href = `/shop/checkout/confirm/${orderId}`;
        });
    } catch (err) {
      console.log('error :(');
      console.log(err);
    }
  };
  const submitOrderToPrintify = () => {};
  return (
    <PayPalScriptProvider
      options={{
        'client-id': paypalId,
      }}
    >
      <PayPalButtons
        className={styles.paypal}
        style={{
          color: 'black',
          label: 'checkout',
        }}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: totalCost / 100,
                },
                items: items,
                shipping: address,
              },
            ],
            application_context: {
              shipping_preference: 'NO_SHIPPING',
            },
          });
        }}
        onApprove={(data, actions) => {
          return actions.order.capture().then(async (details) => {
            await handlePayment(details);
          });
        }}
      />
    </PayPalScriptProvider>
  );
};

export default PaypalBtn;
