require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./connectDB'); // Import the connectDB function
const noteRoutes = require('./noteRoutes');

const app = express();
app.use(bodyParser.json());

// Connect to MongoDB
connectDB(); // Call connectDB to establish the database connection

// Use note routes
app.use('/api', noteRoutes);

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
