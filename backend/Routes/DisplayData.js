// jshint esversion:6
const express = require('express');
const routers = express.Router();

routers.post('/foodData', (req,res) =>{
    try {
        res.send([global.food_items,global.categories])
    } catch (error) {
        console.error(error.message);
        res.send(error);
    }
})
module.exports =routers;