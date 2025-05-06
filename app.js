const express = require('express');
const noteRoutes = require('./noteRoutes');

const app = express();

app.use(express.json());

// Define a route for the root URL
app.get('/', (req, res) => {
    res.send('Welcome to MyNodeApp!');
});

// Mount the noteRoutes with the base path '/api'
app.use('/api', noteRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});