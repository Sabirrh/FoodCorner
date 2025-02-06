// jshint esversion:6
const express = require('express');
const routers = express.Router();
const Order = require('../models/Orders');

routers.post('/orderData', async(req,res) => {
    let data = JSON.parse(JSON.stringify(req.body.order_data));
    await data.splice(0,0, {order_data: req.body.order_data});
    // if email is not in db then create : else: insertMany
    let eId = await Order.findOne({email: req.body.email});
    console.log(eId)
    if(eId === null) {
        try{
            await Order.create({
                email: req.body.email,
                order_data: [data]
            }).then(() => {
                   res.json({ success: true})
            })
        }catch(e){
            console.log(e.message)
            res.send("Server Error",e.message)
        }
    }
    else{
        try{
            await Order.findOneAndUpdate({email: req.body.email},
                { $push:{ order_data: data} }
            ).then(() => {
                    res.json({ success: true})
            })

        }catch(e){
            console.log(e.message)
            res.send("Server Error",e.message)
        }
    }
})


routers.post('/myorderData', async(req,res) => {
    try{
let myData = await Order.findOne({'email':req.body.email})
res.json({orderData: myData})
    }catch(e){

    }
}
)
module.exports = routers;