// jshint version:6
import React, { useState } from 'react';
import Login from './Login';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", geolocation: "" })
  const handleSUbmit = async (e) => {
    e.preventDefault();
    try{
    const response = await fetch("http://localhost:5000/api/createuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
        location: credentials.geolocation,
      }), 
    });
    const json = await response.json();
    console.log(json);

    if (response.ok && json.success) {
      alert('User Created Successfully!');
      setCredentials({ name: "", email: "", password: "", geolocation: "" });
      navigate('/');
    } else {
      alert(json.error || 'Enter valid credentials');
    }
  } catch (error) {
    console.error('Error during signup:', error);
    alert('Something went wrong. Please try again later.');
  }
};
  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value })
  };

  return (
    <>
      <div className='container'>
        <form onSubmit={handleSUbmit}>
          <div className="mb-3">
            <label htmlFor="name" className='form-label'>Name</label>
            <input type="text" className='form-control' placeholder="Enter Your name" name='name' value={credentials.name} onChange={onChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input type="email" className="form-control" aria-describedby="emailHelp" placeholder="Enter email" name='email' value={credentials.email} onChange={onChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input type="password" className="form-control" placeholder="Password" name='password' value={credentials.password} onChange={onChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputAddress">Address</label>
            <input type="text" className="form-control" placeholder="Enter Your Address" name='geolocation' value={credentials.geolocation} onChange={onChange} />
          </div>
          <button type="submit" className="m-3 btn btn-success">Submit</button>
          <Link to="/login" className='m-3 btn btn-danger'>Already a User</Link>
        </form>
      </div>
    </>
  )
}

export default Signup;