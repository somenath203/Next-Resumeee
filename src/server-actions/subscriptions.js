'use server';

const { connectToMongoDB } = require("@/config/dbConnect");
import SubscriptionModel from "@/models/subscriptionModel";
import UserModel from "@/models/userModels";

connectToMongoDB();


export const saveUserSubscription = async (payload) => {

    try {

        const userWhoIsMakingPayment = await UserModel.findById(payload?.user);   

        const newSubscription = await SubscriptionModel.create({
            user: userWhoIsMakingPayment?._id,
            paymentId: payload?.paymentId,
            amount: payload?.amount
        });

        const userUpdatedWithSubscription = await UserModel.findByIdAndUpdate(userWhoIsMakingPayment?._id, { currentSubscription: newSubscription }, { new: true });

        return {
            success: true,
            message: 'your subscription has been successfuly activated',
            data: JSON.parse(JSON.stringify(userUpdatedWithSubscription))
        }
        
    } catch (error) {

        console.log(error);
        
        return {
            success: false,
            message: error?.message
        }

    }

}


export const getAllSubscriptions = async () => {

    try {

        const response = await SubscriptionModel.find().populate("user").sort({ createdAt: -1 });

        return {
            success: true,
            data: JSON.parse(JSON.stringify(response))
        }
        
    } catch (error) {
        
        console.log(error);
        
        return {
            success: false,
            message: error?.message
        }

    }

}