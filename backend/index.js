// // jshint esversion: 6
// const express = require('express');
// const app = express();
// const mongoDB = require('./db');
//     mongoDB();

// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
//     res.header(
//         "Access-Control-Allow-Headers",
//         "Origin, X-Requested-With, Content-Type, Accept"
//     );
//     next();
//     })
// app.use(express.json());
// app.use('/api',require("./Routes/createuser"));
// app.use('/api/', require("./Routes/DisplayData"));
// app.get('/', (req, res) => {
//     res.send("Hello World!");
// });
// // app.use('/api/auth', require('./Routes/Auth'));

// app.listen(5000,() => {
//     console.log("App is running at port 5000");
// })


// jshint esversion: 6
const express = require('express');
const cors = require('cors');

const app = express();
const mongoDB = require('./db');

// Initialize MongoDB connection
mongoDB();

// Enable CORS for all routes
app.use(cors());

// Middleware to allow specific headers
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

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
app.listen(5000, () => {
    console.log("App is running at port 5000");
});
