import { Button, message } from "antd";
import { useState } from "react";
import { getStripeClientSecret } from "@/server-actions/payments";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import dayjs from "dayjs";

import userGlobalStore from "@/store/user-store";
import StripeCheckoutFormModal from "./StripeCheckoutFormModal";


const UserSubscription = () => {

  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);


  const { currentUserData, setCurrentUserData } = userGlobalStore();

  const [ loading, setLoading ] = useState();

  const [ stripeClientSecret, setStripeClientSecret ] = useState('');

  const [ showCheckoutFormModal, setShowCheckoutFormModal ] = useState(false);


  const options = {

    clientSecret: stripeClientSecret

  };

  
  const getClientSecretOfStripe = async () => {

    try {

        setLoading(true);

        const response = await getStripeClientSecret();

        if(response?.success) {

            setStripeClientSecret(response?.data);

            setShowCheckoutFormModal(true);

            message.success('stripe payment started successfully');

        }
        
    } catch (error) {
        
        message.error('Something went wrong. Please try again.');

        setShowCheckoutFormModal(false);

    } finally {

        setLoading(false);

    }

  }

  if (currentUserData?.currentSubscription) {

    return <div className="bg-green-200 bg-opacity-50 text-center text-sm lg:text-base p-5 border-green-200 border border-solid tracking-wide">
        You have an active subscription. Subscription start time: {dayjs(currentUserData?.currentSubscription?.createdAt).format('MMMM DD, YYYY hh:mm A')}
    </div>
  }

  return (
    <div className="bg-red-200 bg-opacity-50 p-5 border-red-200 border border-solid tracking-wide flex flex-col gap-5 lg:gap-0 lg:flex-row lg:justify-between items-center">

        <span className="text-center">You do not have any active subscription.</span>

        <Button type="primary" onClick={getClientSecretOfStripe} loading={loading}>Subscribe Now (Rs.1000)</Button>


        {showCheckoutFormModal && stripeClientSecret && <Elements options={options} stripe={stripePromise}>
            <StripeCheckoutFormModal 
                currentUserId={currentUserData?._id}
                setCurrentUserData={setCurrentUserData}
                showCheckoutFormModal={showCheckoutFormModal} 
                setShowCheckoutFormModal={setShowCheckoutFormModal} 
            />
        </Elements>}


    </div>
  )
}

export default UserSubscription;