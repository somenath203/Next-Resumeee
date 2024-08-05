import mongoose from 'mongoose';


export const connectToMongoDB = async () => {
    
    try {

        await mongoose.connect(process.env.MONGO_URI);

        console.log('connection to MongoDB successful...');
        

    } catch (error) {
        
        console.log(error);
        
    }

}