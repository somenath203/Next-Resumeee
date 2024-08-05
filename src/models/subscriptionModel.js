import mongoose from "mongoose";


const subscriptionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    paymentId: {
        type: String
    },
    amount: {
        type: Number
    }
}, {
    timestamps: true 
});


if (mongoose.models && mongoose.models['subscriptions']) {

    delete mongoose.models['subscriptions'];
  
}
  
  
const SubscriptionModel = mongoose.model('subscriptions', subscriptionSchema);
  
export default SubscriptionModel;