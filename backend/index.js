const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const mongoDB = require('./db');
const Middleware = require('./middleware/middleware');
const PORT = process.env.PORT || 5000;
mongoDB();
//Middleware
app.use(cors());
app.use(Middleware)
app.use(express.json());

// Routes
app.use('/api', require("./Routes/createuser"));
app.use('/api/', require("./Routes/DisplayData"));
app.use('/api', require('./Routes/orderData'));
// app.use('/api/auth', require('./Routes/Auth'));

app.get('/', (req, res) => {
    res.send("Hello World!");
});

// Start server
app.listen(PORT, () => {
    console.log(`App is running at port ${PORT}`);
});
