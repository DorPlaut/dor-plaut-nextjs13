'use client';

import React, { useState, useEffect } from 'react';
import { useCartStore } from '@/store/cartStore';
import { useUserStore } from '@/store/userStore';
import { useAlertStore } from '@/store/alertStore';
import {
  CountryDropdown,
  RegionDropdown,
  CountryRegionData,
} from 'react-country-region-selector';
import styles from '@/styles/Shop.module.css';
import axios from 'axios';
import PaypalBtn from './PaypalBtn';

const Form = () => {
  const cart = useCartStore((state) => state.cart);
  const user = useUserStore((state) => state.user);
  const [cartTotal, setCartToatl] = useState(0);

  // alerts
  const showAlert = useAlertStore((state) => state.showAlert);
  //

  // Calculate the total cost of the cart
  useEffect(() => {
    if (cart.products && cart.products.length > 0) {
      const total = cart.products.reduce((acc, product) => {
        return acc + product.price * product.quantity;
      }, 0);
      setCartToatl(total);
    }
  }, [cart]);
  // delivery info
  const [firstName, setFirstName] = useState('Your name');
  const [lastName, setLastName] = useState('Your last name');
  const [email, setEmail] = useState('Your@email.com');
  const [phone, setPhone] = useState('(+666)12-3456789');
  const [country, setCountry] = useState('');
  const [region, setRegion] = useState('');
  const [address1, setAddress1] = useState('Your address');
  const [address2, setAddress2] = useState('apt, suite, etc...');
  const [city, setCity] = useState('Your city');
  const [zip, setZip] = useState('546187');
  const [shippingCost, setShippingCosts] = useState('');
  const [totalCost, setTotalCosts] = useState('');
  const [ispaying, setIsPaying] = useState(false);
  const [orderId, setOrderId] = useState('');

  //   submit form
  let shipping;
  let items;
  const handleSubmit = async (event) => {
    calculateShipping();
    event.preventDefault();
    // set details for paypal
    shipping = {
      address: {
        address_line_1: address1,
        address_line_2: address2,
        admin_area_2: city,
        admin_area_1: region,
        postal_code: zip,
        country_code: country,
      },
    };
    items = cart.products.map((item) => {
      return {
        name: item.title,
        description: item.sku,
        quantity: item.quantity.toString(),
        unit_amount: {
          currency_code: 'USD',
          value: item.price.toFixed(2),
        },
      };
    });
    // open payment tab
    setIsPaying(true);
  };

  // Submit Order and calculate shipping
  const calculateShipping = async () => {
    if (!country) {
      showAlert('Please fill the shipping details', 'danger');
    } else {
      try {
        await axios
          .post(`/api/orders`, {
            userId: user._id,
            cartId: cart._id,
            address_to: {
              first_name: firstName,
              last_name: lastName,
              email: email,
              phone: phone,
              country: country,
              region: region,
              address1: address1,
              address2: address2,
              city: city,
              zip: zip,
            },
          })
          .then((response) => {
            setShippingCosts(response.data.shipping);
            setTotalCosts(response.data.total);
            setOrderId(response.data.orderId);
          });
      } catch (err) {
        console.log('error :(');
        console.log(err);
      }
    }
  };
  //
  // update cart total
  useEffect(() => {
    if (country) {
      calculateShipping();
    }
  }, [cart, country]);
  return (
    <>
      {cart.products.length > 0 && (
        <div className={styles.checkout_form_container}>
          <form onSubmit={handleSubmit} action="" method="post">
            <div className={styles.checkout_form}>
              <div className={styles.checkout_input}>
                <label>First name: </label>
                {ispaying ? (
                  <span
                    onClick={() =>
                      showAlert(
                        'Go back to edit mode to edit your address',
                        'danger'
                      )
                    }
                    className={styles.readonly_input}
                  >
                    {firstName}
                  </span>
                ) : (
                  <input
                    type="text"
                    name="first_name"
                    // value={firstName}
                    placeholder={firstName}
                    onChange={(event) => {
                      setFirstName(event.target.value);
                    }}
                    required
                  />
                )}
              </div>
              <div className={styles.checkout_input}>
                <label>Last name: </label>
                {ispaying ? (
                  <span
                    onClick={() =>
                      showAlert(
                        'Go back to edit mode to edit your address',
                        'danger'
                      )
                    }
                    className={styles.readonly_input}
                  >
                    {lastName}
                  </span>
                ) : (
                  <input
                    type="text"
                    name="last_name"
                    placeholder={lastName}
                    onChange={(event) => {
                      setLastName(event.target.value);
                    }}
                    required
                  />
                )}
              </div>
              <div className={styles.checkout_input}>
                <label>Email: </label>
                {ispaying ? (
                  <span
                    onClick={() =>
                      showAlert(
                        'Go back to edit mode to edit your address',
                        'danger'
                      )
                    }
                    className={styles.readonly_input}
                  >
                    {email}
                  </span>
                ) : (
                  <input
                    type="email"
                    name="email"
                    placeholder={email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                    }}
                    required
                  />
                )}
              </div>
              <div className={styles.checkout_input}>
                <label>Phone number: </label>
                {ispaying ? (
                  <span
                    onClick={() =>
                      showAlert(
                        'Go back to edit mode to edit your address',
                        'danger'
                      )
                    }
                    className={styles.readonly_input}
                  >
                    {phone}
                  </span>
                ) : (
                  <input
                    type="tel"
                    name="phone"
                    placeholder={phone}
                    onChange={(event) => {
                      setPhone(event.target.value);
                    }}
                    required
                  />
                )}
              </div>
              <div className={styles.checkout_input}>
                <label>Country: </label>
                {ispaying ? (
                  <span
                    onClick={() =>
                      showAlert(
                        'Go back to edit mode to edit your address',
                        'danger'
                      )
                    }
                    className={styles.readonly_input}
                  >
                    {country}
                  </span>
                ) : (
                  <CountryDropdown
                    classes="input"
                    name="country"
                    valueType="short"
                    value={country}
                    onChange={(event) => {
                      setCountry(event);
                    }}
                    required
                  />
                )}
              </div>
              <div className={styles.checkout_input}>
                <label>Region: </label>
                {ispaying ? (
                  <span
                    onClick={() =>
                      showAlert(
                        'Go back to edit mode to edit your address',
                        'danger'
                      )
                    }
                    className={styles.readonly_input}
                  >
                    {region}
                  </span>
                ) : (
                  <RegionDropdown
                    classes="input"
                    name="region"
                    countryValueType="short"
                    country={country}
                    value={region}
                    onChange={(event) => {
                      setRegion(event);
                    }}
                  />
                )}
              </div>
              <div className={styles.checkout_input}>
                <label>Address: </label>
                {ispaying ? (
                  <span
                    onClick={() =>
                      showAlert(
                        'Go back to edit mode to edit your address',
                        'danger'
                      )
                    }
                    className={styles.readonly_input}
                  >
                    {address1}
                  </span>
                ) : (
                  <input
                    type="text"
                    name="address1"
                    placeholder={address1}
                    onChange={(event) => {
                      setAddress1(event.target.value);
                    }}
                    required
                  />
                )}
              </div>
              <div className={styles.checkout_input}>
                <label>Secondery address {'(optional)'}: </label>{' '}
                {ispaying ? (
                  <span
                    onClick={() =>
                      showAlert(
                        'Go back to edit mode to edit your address',
                        'danger'
                      )
                    }
                    className={styles.readonly_input}
                  >
                    {address2}
                  </span>
                ) : (
                  <input
                    type="text"
                    name="address2"
                    placeholder={address2}
                    onChange={(event) => {
                      setAddress2(event.target.value);
                    }}
                  />
                )}
              </div>
              <div className={styles.checkout_input}>
                <label>City : </label>{' '}
                {ispaying ? (
                  <span
                    onClick={() =>
                      showAlert(
                        'Go back to edit mode to edit your address',
                        'danger'
                      )
                    }
                    className={styles.readonly_input}
                  >
                    {city}
                  </span>
                ) : (
                  <input
                    type="text"
                    name="city"
                    placeholder={city}
                    onChange={(event) => {
                      setCity(event.target.value);
                    }}
                    required
                  />
                )}
              </div>
              <div className={styles.checkout_input}>
                <label>Zip code : </label>{' '}
                {ispaying ? (
                  <span
                    onClick={() =>
                      showAlert(
                        'Go back to edit mode to edit your address',
                        'danger'
                      )
                    }
                    className={styles.readonly_input}
                  >
                    {zip}
                  </span>
                ) : (
                  <input
                    type="text"
                    name="zip"
                    placeholder={zip}
                    onChange={(event) => {
                      setZip(event.target.value);
                    }}
                    required
                  />
                )}
              </div>
            </div>
            {/* info and buttons */}
            <div className={styles.checkout_total}>
              {shippingCost ? (
                <span>{`Shipping: ${(shippingCost / 100).toFixed(
                  2
                )}$ | Total with shipping:  ${(totalCost / 100).toFixed(
                  2
                )}$ `}</span>
              ) : (
                <button
                  type="button"
                  className="btn block-btn bright"
                  onClick={() => {
                    calculateShipping();
                  }}
                >
                  Calculate shipping cost
                </button>
              )}
              {shippingCost &&
                (ispaying ? (
                  <button
                    type="button"
                    className="btn block-btn bright"
                    onClick={() => {
                      setIsPaying(false);
                    }}
                  >
                    Edit shipping details
                  </button>
                ) : (
                  <button type="submit" className="btn block-btn bright">
                    Continue to payment
                  </button>
                ))}
            </div>
          </form>
          {ispaying && (
            <div className={styles.paypal_container}>
              <h1>payment</h1>
              <div className="flex-row">
                Total: ${(totalCost / 100).toFixed(2)}$
              </div>
              <br />

              <PaypalBtn
                totalCost={totalCost}
                shipping={shipping}
                items={items}
                cart={cart}
                orderId={orderId}
                shippingCost={shippingCost}
              />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Form;
