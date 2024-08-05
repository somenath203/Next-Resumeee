import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    clerkUserId: {
      type: String, 
    },
    fullName: {
      type: String,
    },
    email: {
      type: String,
    },
    profileDataForResume: {
      type: Object,
    },
    currentSubscription: {
      default: null,
      type: Object
    }
  },
  {
    timestamps: true,
  }
);


if (mongoose.models && mongoose.models['users']) {

  delete mongoose.models['users'];

}


const UserModel = mongoose.model('users', userSchema);

export default UserModel;
