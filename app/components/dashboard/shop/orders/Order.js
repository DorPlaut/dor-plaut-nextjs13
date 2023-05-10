`use client`;

import React, { useCallback, useEffect, useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import Head from 'next/head';
import { useProductsStore } from '@/store/productsStrore';
import axios from 'axios';
import Image from 'next/image';
import styles from '@/styles/Dashboard.module.css';
import AddProduct from '@/components/dashboard/shop/AddProduct';
import { useAlertStore } from '@/store/alertStore';

const Order = ({ order, printifyOrder, getOrders }) => {
  // order info
  const products = order.products;
  const userInfo = order.shipTo;
  const printifyOrderStatus = printifyOrder.status;
  //   controller state
  const [isOpen, setIsOpen] = useState(false);

  // order status
  const [orderStatus, setOrderStatus] = useState(order.status);
  const [isEditing, setIsEditing] = useState(false);

  // alerts
  const showAlert = useAlertStore((state) => state.showAlert);

  // Delete order
  const deleteOrder = async (id) => {
    try {
      await axios
        .delete(`/api/orders/admin`, { data: { orderId: id } })
        .then(() => {
          showAlert('Order deleted successfully', 'success');
          getOrders();
        });
    } catch (error) {
      console.log(error);
      showAlert('error', 'danger');
    }
  };
  // Edit order status
  const editOrderStatus = async (id, status) => {
    try {
      await axios
        .put(`/api/orders/admin`, { orderId: id, status: status })
        .then(() => {
          showAlert('Order status updated successfully', 'success');
          getOrders();
        });
    } catch (error) {
      console.log(err);
      showAlert('error', 'danger');
    }
  };

  return (
    <div className={styles.order}>
      {isOpen ? (
        <>
          <div>
            {/* products */}
            {products.map((product, index) => {
              return (
                <div key={index} className={styles.order_product}>
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
                </div>
              );
            })}
          </div>
          <div className={styles.info_container}>
            {/* user info */}
            <div className={`${styles.customer_details} `}>
              <span>
                {userInfo.first_name} {userInfo.last_name}
              </span>
              <span>{userInfo.email}</span>
              <span>{userInfo.phone}</span>
              <span>
                {userInfo.address1}, {userInfo.address2}
              </span>
              <span>
                {userInfo.city}, {userInfo.region}, {userInfo.country}
              </span>
              <span>{userInfo.zip}</span>
            </div>
            {/* order status */}
            <div className={styles.order_status}>
              <span>Order status:</span>
              {isEditing ? (
                <>
                  <input
                    type="text"
                    value={orderStatus}
                    onChange={(e) => setOrderStatus(e.target.value)}
                  />
                  <button
                    className="btn block-btn dark"
                    onClick={() => {
                      editOrderStatus(order._id, orderStatus);
                      setIsEditing(false);
                    }}
                  >
                    Save
                  </button>
                </>
              ) : (
                <span>{orderStatus}</span>
              )}
              <div>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="btn block-btn dark"
                >
                  Edit public status
                </button>
              </div>

              {printifyOrder.shipments ? (
                <>
                  <span>carrier: {printifyOrder.shipments.carrier}</span>
                  <span>tracking number: {printifyOrder.shipments.number}</span>
                  <span>status: {printifyOrder.status}</span>
                  <span>chack order status: {printifyOrder.shipments.url}</span>
                </>
              ) : (
                <>
                  <span>{printifyOrderStatus}</span>
                  {printifyOrderStatus === 'canceled' &&
                    order.status !== 'canceled' && (
                      <>
                        <span>
                          This order was canncelled using the printify
                          dashboard. please delete it or set it to completed to
                          save the order info
                        </span>
                        <button
                          onClick={() => editOrderStatus(order._id, 'canceled')}
                          className="btn block-btn dark"
                        >
                          Cancel order
                        </button>
                        <button
                          onClick={() => deleteOrder(order._id)}
                          className="btn block-btn dark"
                        >
                          Delete order
                        </button>
                      </>
                    )}
                </>
              )}
            </div>
            <div></div>
            <div className={styles.order_btns}>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="btn block-btn dark"
              >
                Minimize order
              </button>
              <br />
              <button
                onClick={() => editOrderStatus(order._id, 'completed')}
                className="btn block-btn dark"
              >
                Set as completed
              </button>
              <button
                onClick={() => editOrderStatus(order._id, 'canceled')}
                className="btn block-btn dark"
              >
                Cancel order
              </button>
              <button
                onClick={() => deleteOrder(order._id)}
                className="btn block-btn dark"
              >
                Delete order permanently
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className={styles.order_controller}>
          <div className={styles.order_controller_info}>
            <h3>
              {userInfo.first_name} {userInfo.last_name}
            </h3>
            <h4
              style={{
                color:
                  order.status === 'canceled'
                    ? 'DarkRed'
                    : order.status === 'completed'
                    ? 'DarkGreen'
                    : order.status === 'awaiting shipment'
                    ? 'red'
                    : '',
              }}
            >
              {orderStatus}
            </h4>

            <span>{new Date(order.createdAt).toDateString()}</span>
          </div>
          <div>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="btn block-btn dark"
            >
              See more/ Edit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Order;
