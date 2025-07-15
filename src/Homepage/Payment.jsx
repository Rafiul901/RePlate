// src/Pages/Payment.jsx
import { Elements } from '@stripe/react-stripe-js';
import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import Charity from './Charity';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const Payment = () => {
  return (
    <Elements stripe={stripePromise}>
      <Charity />
    </Elements>
  );
};

export default Payment;
