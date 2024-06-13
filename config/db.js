const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = async () => {
    const mongoURI = process.env.NODE_ENV === 'test' ? process.env.MONGO_URI_TEST : process.env.MONGO_URI;
    
    try {
        await mongoose.connect(mongoURI);
        console.log(`MongoDB connected: ${mongoURI}`);
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
};

module.exports = connectDB;

