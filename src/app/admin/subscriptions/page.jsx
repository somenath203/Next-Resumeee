import { getAllSubscriptions } from "@/server-actions/subscriptions";
import SubscriptionsTable from "./_components/SubscriptionsTable";

const Page = async () => {
  
  const allSubscriptions = await getAllSubscriptions();  

  if(!allSubscriptions?.success) {

    return;

  }

  return (
    <div>

      <h1 className="text-primary text-lg font-bold uppercase">
        Subscriptions
      </h1>
      
      <SubscriptionsTable allSubscriptionData={allSubscriptions} />
    
    </div>
  )
};

export default Page;