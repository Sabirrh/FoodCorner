import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function MyOrder() {

    const [orderData, setorderData] = useState({})

    const fetchMyOrder = async () => {
        console.log(localStorage.getItem('userEmail'))
        await fetch("http://localhost:5000/api/auth/myOrderData", {
            // credentials: 'include',
            // Origin:"http://localhost:3000/login",
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: localStorage.getItem('userEmail')
            })
        }).then(async (res) => {
            let response = await res.json()
            await setorderData(response)
        })

    }

    useEffect(() => {
        fetchMyOrder()
    }, [])

    return (
        <div>
            <div>
                <Navbar />
            </div>
            {/* <div className='container'>
                <div className='row'>

                    {orderData && orderData.orderData && orderData.orderData.order_data.length > 0 ? Array(orderData).map(data => {
                        return (
                            data.orderData ?
                                data.orderData.order_data.slice(0).reverse().map((item) => {
                                    return (
                                        item.map((arrayData) => {
                                            return (
                                                <div  >
                                                    {arrayData.Order_date ? <div className='m-auto mt-5'>

                                                        {data = arrayData.Order_date}
                                                        <hr />
                                                    </div> :

                                                        <div className='col-12 col-md-6 col-lg-3' >
                                                            <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
                                                                <img src={arrayData.img} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} />
                                                                <div className="card-body">
                                                                    <h5 className="card-title">{arrayData.name}</h5>
                                                                    <div className='container w-100 p-0' style={{ height: "38px" }}>
                                                                        <span className='m-1'>{arrayData.qty}</span>
                                                                        <span className='m-1'>{arrayData.size}</span>
                                                                        <span className='m-1'>{data}</span>
                                                                        <div className=' d-inline ms-2 h-100 w-20 fs-5' >
                                                                            ₹{arrayData.price}/-
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>



                                                    }

                                                </div>
                                            )
                                        })

                                    )
                                }) : ""
                        )
                    }) : ""}
                </div>


            </div> */}
            <div className="container">
                <div className="row">
                    {orderData && orderData.orderData && orderData.orderData.order_data.length > 0 ? (
                        orderData.orderData.order_data
                            .slice(0)
                            .reverse()
                            .map((orderGroup, index) => (
                                <div key={index}>
                                    {orderGroup.map((item, i) =>
                                        item.Order_date ? (
                                            <div key={i} className="m-auto mt-5">
                                                <h5>{item.Order_date}</h5>
                                                <hr />
                                            </div>
                                        ) : (
                                            <div key={i} className="col-12 col-md-6 col-lg-3">
                                                <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
                                                    <img
                                                        src={item.img}
                                                        className="card-img-top"
                                                        alt={item.name}
                                                        style={{ height: "120px", objectFit: "fill" }}
                                                    />
                                                    <div className="card-body">
                                                        <h5 className="card-title">{item.name}</h5>
                                                        <div className="container w-100 p-0" style={{ height: "38px" }}>
                                                            <span className="m-1">{item.qty}</span>
                                                            <span className="m-1">{item.size}</span>
                                                            <div className="d-inline ms-2 h-100 w-20 fs-5">
                                                                ₹{item.price}/-
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    )}
                                </div>
                            ))
                    ) : (
                        <div className="text-center mt-5">No orders found 😕</div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    )
}