// jshint esversion:6
const mongoose = require('mongoose');
// Replace with your MongoDB URI
const data = "mongodb+srv://foodApp:food12@fooddetails.ulwy7.mongodb.net/foodappMern?retryWrites=true&w=majority&appName=foodDetails";

const mongoDB = async () => {
    try {
        // Await mongoose.connect
        await mongoose.connect(data);
        console.log('MongoDB connected successfully');

        // Ensure connection is ready before querying
        const dataFetched = await mongoose.connection.db.collection("food_items");
        const foodItems = await dataFetched.find({}).toArray();

        const categoryFatched = await mongoose.connection.db.collection("food_category");
        const categories = await categoryFatched.find({}).toArray();
        global.categories = categories;
        global.food_items = foodItems;
        // console.log(global.food_items); // Log fetched data
    } catch (error) {
        console.error("Error connecting to MongoDB or fetching data:", error);
    }
};

module.exports = mongoDB;
