import React, { use, useCallback, useEffect, useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import Head from 'next/head';
import { useProductsStore } from '@/store/productsStrore';
import axios from 'axios';
import Image from 'next/image';
import styles from '@/styles/Dashboard.module.css';
import AddProduct from '@/components/dashboard/shop/AddProduct';
import { useAlertStore } from '@/store/alertStore';
import Order from './Order';

const AllOrders = () => {
  const [orders, setOrders] = useState('');
  const getAllProducts = useCallback(() => {
    useProductsStore.getState().getAllProducts();
  }, []);

  useEffect(() => {
    getAllProducts();
  }, [getAllProducts]);

  // alerts
  const showAlert = useAlertStore((state) => state.showAlert);

  // get all orders
  const getOrders = async () => {
    try {
      await axios.get(`/api/orders/admin`).then((res) => {
        setOrders(res.data);
        console.log(res.data);
      });
    } catch (error) {
      console.log(error);
      showAlert('error', 'danger');
    }
  };

  // use effect
  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div>
      <h2>Orders</h2>
      <h3>Manage your shop</h3>
      <div className={styles.orders_container}>
        {orders &&
          orders.self.map((order, index) => {
            const printifyOrder = orders.printify.data.filter(
              (o) => o.id === order.printify_id
            )[0];
            return (
              <Order
                order={order}
                key={index}
                printifyOrder={printifyOrder}
                getOrders={getOrders}
              />
            );
          })}
      </div>
    </div>
  );
};

export default AllOrders;
