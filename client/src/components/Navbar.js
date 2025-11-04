import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import signUp from '../screens/Signup';
import Badge from 'react-bootstrap/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from 'react-router-dom';
import Modal from '../Model';
import Cart from '../screens/Cart';
import { useCart } from './ContextReducer';
import { toast } from 'react-toastify';
const Navbar = () => {
    const [cartView, setCartView] = useState(false);
    localStorage.setItem('temp',"first")
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("authToken");
        navigate("/login");
        toast.success("Logout Please login.")
    }
    const loadCart = ()=>{
        setCartView(true);
    }
    const items = useCart();

    return (
        <div>
            <nav class="navbar navbar-expand-lg navbar-light bg-success position-sticky">
                <div class="container-fluid">
                    <Link className="navbar-brand fs-1 fst-italic fw-bold" to="/">FoodCorner</Link>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav me-auto mb-2">
                            <li class="nav-item">
                                <Link class="nav-link active fs-5" aria-current="page" to="/">Home</Link>
                            </li>
                            {(localStorage.getItem("authToken")) ?
                                <li class="nav-item">
                                    <Link class="nav-link active fs-5" aria-current="page" to="/myOrder">My order</Link>
                                </li>
                                : ""
                            }
                        </ul>
                        {(!localStorage.getItem("authToken")) ?
                            <div className='d-flex'>
                                <form className='d-flex'>
                                <Link className="btn bg-white text-success mx-1" to="/login">Login</Link>
                                <Link className="btn bg-white text-success mx-1" to="/createuser">Signup</Link>
                                </form>
                            </div>
                            : <div>
                            <div className="btn bg-white text-success mx-2 " onClick={loadCart}>
                                    <Badge color="secondary" badgeContent={items.length} >
                                        <ShoppingCartIcon />
                                    </Badge>
                                    Cart
                                </div>
                                
                                {cartView ? <Modal onClose={() => setCartView(false)}><Cart /></Modal> : ""}
                                <div className='btn bg-white text-success text-danger mx-2' onClick={handleLogout}>
                                    Logout
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </nav>
        </div>
    )
};

export default Navbar;