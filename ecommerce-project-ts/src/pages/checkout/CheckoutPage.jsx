import axios from 'axios';
import { OrderSummary } from './OrderSummary';
import {useState,useEffect} from 'react';
import { PaymentSummary } from './PaymentSummary';
import './checkout-header.css';
import './CheckoutPage.css';
import { CheckoutHeader } from './CheckoutHeader';

export function CheckoutPage({cart,loadCart}){
  const [deliveryOptions,setDeliveryOptions]=useState([]);
  const [paymentSummary,setPaymentSummary]=useState(null);
  useEffect(()=>{
    const fetchCheckoutData=async () => {
      let responsePay = await axios.get('/api/payment-summary')
      setPaymentSummary(responsePay.data);
    };
    fetchCheckoutData();
  },[cart]);

  useEffect(()=>{
    const fetchCheckoutData=async () => {
      let responseDel = await axios.get('/api/delivery-options?expand=estimatedDeliveryTime')
      setDeliveryOptions(responseDel.data);
      let responsePay = await axios.get('/api/payment-summary')
      setPaymentSummary(responsePay.data);
    };
    fetchCheckoutData();
  },[]);

  return (
  <>
    <title>Checkout</title>

    <CheckoutHeader />

    <div className="checkout-page">
      <div className="page-title">Review your order</div>

      <div className="checkout-grid">
        <OrderSummary cart={cart} deliveryOptions={deliveryOptions} loadCart={loadCart}/>
        <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart}/>
      </div>
    </div>
  </>
  );
}