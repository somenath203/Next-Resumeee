'use client';

import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Button, Modal, message } from 'antd';
import { useState } from 'react';

import { saveUserSubscription } from '@/server-actions/subscriptions';


const StripeCheckoutFormModal = ({ showCheckoutFormModal, setShowCheckoutFormModal, currentUserId, setCurrentUserData }) => {

  const stripe = useStripe();

  const elements = useElements();

  const [loading, setLoading] = useState('');


  const handleSubmit = async (event) => {

    try {
      
      event.preventDefault();

      if (!stripe || !elements) {
        return;
      }

      setLoading(true);

      const result = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: "",
        },
        redirect: 'if_required'
      });

      if (result.error) {

        message.error(result.error.message);

      } else {

        message.success('payment successful');

        const response = await saveUserSubscription({
          user: currentUserId,
          paymentId: result?.paymentIntent?.id,
          amount: 1000
        });

        if (response?.success) {

          setCurrentUserData(response?.data); 

          message.success(response?.message);

          setShowCheckoutFormModal(false);

        }

      }

    } catch (error) {
      
      console.log(error);
      
      message.error('Something went wrong. Please try again.');

    } finally {

      setLoading(false);

    }
  };

  return (
    <Modal
      open={showCheckoutFormModal}
      onClose={() => setShowCheckoutFormModal(false)}
      onCancel={null}
      centered
      title='Complete your Subscription Payment'
      footer={null}
    >
      <form onSubmit={handleSubmit}>

        <PaymentElement />

        <div className="flex justify-end gap-5 mt-5">
          
          <Button onClick={() => setShowCheckoutFormModal(false)} disabled={loading}>Cancel</Button>

          <Button htmlType='submit' type='primary' loading={loading}>PAY NOW</Button>

        </div>

      </form>

    </Modal>
  )
};

export default StripeCheckoutFormModal;