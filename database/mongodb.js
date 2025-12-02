import mongoose from 'mongoose';    
import { DB_URI } from '../config/env.js';  

if(!DB_URI){    
    throw new Error('DB_URI is not defined in environment variables');  
}

const ConnetToDB = async () => {
    try {
        await mongoose.connect(DB_URI)
        console.log('Connected to MongoDB successfully');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1); 
    }   
}

export default ConnetToDB;  
