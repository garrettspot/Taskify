const mongoose = require('mongoose');

const connectDB = async () => {
  const mongoURI = process.env.MONGODB_URI;

  if (!mongoURI) {
    console.error('MONGODB_URI not set. Please add it to server/.env or environment variables.');
    process.exit(1);
  }

  try {
    console.log('Connecting to MongoDB...');
    const conn = await mongoose.connect(mongoURI);

    // console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('Database connection error:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
