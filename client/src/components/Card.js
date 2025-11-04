import React, { useState, useRef, useEffect } from "react";
import { useDispatchCart, useCart } from "./ContextReducer";
import { useNavigate } from "react-router-dom";
const Card = (props) => {
  let dispatch = useDispatchCart();
  let data = useCart();
  let options = props.options;
  let priceOptions = Object.keys(options)
  const priceRef = useRef();
  const [qty, setQty] = useState(1)
  const [size, setSize] = useState("")
  let navigate = useNavigate();

  const handleClick = () => {
    if (!localStorage.getItem("token")) {
      navigate("/login")
    }
  }
  const handleQty = (e) => {
    setQty(e.target.value);
  }
  const handleOptions = (e) => {
    setSize(e.target.value);
  }
  const handleAddtoCart = async () => {
    let food = []
    for (const item of data) {

      if (item.id === props.foodItem._id) {
        food = item;

        break;
      }
    }
    // let existingItem = data.find((item) => item._id === foodItem._id && item.size === size);
    console.log(food)
    console.log(new Date())
    if (food !== []) {
      if (food.size === size) {
        await dispatch({ type: "UPDATE", id: props.foodItem._id, price: finalPrice, qty: qty })
        return
      }
      else if (food.size !== size) {
        await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size, img: props.ImgSrc })
        console.log("Size different so simply ADD one more to the list")
        return
      }
      return
    }

    await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size })

  }

  useEffect(() => {
    setSize(priceRef.current.value)
  }, [])

  let finalPrice = qty * parseInt(options[size])
  return (
    <div className="card mt-3" style={{ "width": "18rem", "maxHeight": "360px" }}>
      <img src={props.foodItem.img} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} />
      <div className="card-body">
        <h5 className="card-title">{props.foodItem.name}</h5>
        {/* <p className="card-text">Some quick example text to build content.</p> */}
        <div className="container w-100">
          <select className="m-2 h-100 bg-success rounded" onChange={handleQty}>
            {Array.from(Array(8), (e, i) => {
              return <option key={i + 1} value={i + 1}>{i + 1}</option>;
            })}
          </select>
          <select className="m-2 h-100 bg-success rounded" ref={priceRef} onChange={handleOptions}>
            {priceOptions.map((data) => {
              return <option key={data} value={data}>{data}</option>;
            })}
          </select>
          <div className="d-inline h-100 fs-5">
            ₹{finalPrice}
          </div>
          <hr />
          <button className="btn btn-success w-100 mt-2" onClick={handleAddtoCart}>Add to Cart</button>
        </div>
      </div>
    </div>

  )
};

export default Card;
