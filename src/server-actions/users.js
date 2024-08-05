'use server';

import { currentUser } from '@clerk/nextjs/server';

import { connectToMongoDB } from "@/config/dbConnect";
import UserModel from "@/models/userModels";


connectToMongoDB();


export const getCurrentUserFromMongoDBAndCreateNewUserInMongoDB = async () => {

    try {

        const currentLoggedInUser = await currentUser();

        const clerkIdOfTheLoggedInUser = currentLoggedInUser?.id;

        const user = await UserModel.findOne({ clerkUserId: clerkIdOfTheLoggedInUser });


        if(user) {
            return {
                success: true,
                data: JSON.parse(JSON.stringify(user))
            }
        }

        const newUserObj = {
            clerkUserId: currentLoggedInUser?.id,
            fullName: `${currentLoggedInUser?.firstName} ${currentLoggedInUser?.lastName}`,
            email: currentLoggedInUser?.emailAddresses[0]?.emailAddress,
            profilePicURL: currentLoggedInUser?.imageUrl,
            profileDataForResume: {}
        }

        const createNewUser = await UserModel.create(newUserObj);

        return {
            success: true,
            data: JSON.parse(JSON.stringify(createNewUser))
        }
        
    } catch (error) {
        
        return {
            success: false,
            message: error?.message
        }

    }

}


export const updateUserProfileDetails = async (dataOfUser) => {

    try {

      const currentLoggedInUser = await currentUser();


      const clerkIdOfTheLoggedInUser = currentLoggedInUser?.id;
  
      
      const user = await UserModel.findOne({ clerkUserId: clerkIdOfTheLoggedInUser });
  
      
      if (!user) {
        throw new Error('User not found');
      }
  
      const updatedProfileDataForResume = {
        ...user.profileDataForResume,
        ...dataOfUser,
      };
  
      user.profileDataForResume = updatedProfileDataForResume;

  
      const userProfileDetailsUpdated = await user.save();
  
      return {
        success: true,
        message: 'User profile details have been saved successfully',
        data: JSON.parse(JSON.stringify(userProfileDetailsUpdated)),
      };

    } catch (error) {

      return {
        success: false,
        message: error?.message,
      };
      
    }
};


export const getAllUsers = async () => {

  try {

    const allUsers = await UserModel.find().sort({ createdAt: -1 });

    return {
      success: true,
      data: JSON.parse(JSON.stringify(allUsers))
    }
    
  } catch (error) {
    
    console.log(error);

    return {
      success: true,
      message: error?.message
    }
    
  }

}



