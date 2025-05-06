const mongoose = require('mongoose');

let isDBConnected = false; // Flag to track connection status

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');
    isDBConnected = true; // Set flag to true on successful connection
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

const isConnected = () => isDBConnected; // Function to check connection status

module.exports = { connectDB, isConnected };
