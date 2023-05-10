import MainSection from '@/app/components/MainSection';
import TitlesSection from '@/app/components/TitlesSection';
import Form from '@/app/components/shop/checkout/Form';
import Cart from '@/app/components/shop/checkout/Cart';

import React from 'react';

const Checkout = () => {
  return (
    <>
      <TitlesSection>
        <div className="continer">
          <h2>Your cart</h2>
          <Cart checkout />
        </div>
      </TitlesSection>
      <MainSection>
        <div className="container">
          <h2>Delivery Information</h2>
          <Form />
        </div>
      </MainSection>
    </>
  );
};

export default Checkout;
