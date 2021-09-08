import { useState, useEffect, Component } from 'react';
import Axios from 'axios'
import * as ReactBootStrap from "react-bootstrap"
import React from "react";
import {Link} from "react-router-dom";


function RegisterUser() {

    const[firstName, setfirstName] = useState('');
    const[lastName, setlastName] = useState('');
    const[password, setpassword] = useState('');
    const[userStatus, setuserStatus] = useState('');
    const[phone, setphone] = useState('');
    const[email, setemail] = useState('');
    const[username, setusername] = useState('');
    
    const submitlastName = () => {
      Axios({
        method:'post',
        url:'',
        data:{
          "firstName": firstName,
          "lastName": lastName,
          "password": password,
          "userStatus": parseInt(userStatus),
          "phone": phone,
          "email": email,
          "username": username}
      }).then(()=>{
        alert('sucesso');
      });
    };
      return (
        <div className="App">
<ReactBootStrap.Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
  <ReactBootStrap.Navbar.Brand href="#home">Company Name</ReactBootStrap.Navbar.Brand>
  <ReactBootStrap.Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <ReactBootStrap.Navbar.Collapse id="responsive-navbar-nav">
    <ReactBootStrap.Nav className="mr-auto">
    <ReactBootStrap.Nav.Link><Link to="/user">User</Link></ReactBootStrap.Nav.Link>
      <ReactBootStrap.Nav.Link><Link to="/product">Product</Link></ReactBootStrap.Nav.Link>
      <ReactBootStrap.NavDropdown title="Order" id="collasible-nav-dropdown">
        <ReactBootStrap.NavDropdown.Item><Link to="/orderRegister">Register Order</Link></ReactBootStrap.NavDropdown.Item>
        <ReactBootStrap.NavDropdown.Item ><Link to="/orderUpdate">Update Order</Link></ReactBootStrap.NavDropdown.Item>
      </ReactBootStrap.NavDropdown>
    </ReactBootStrap.Nav>
  </ReactBootStrap.Navbar.Collapse>
</ReactBootStrap.Navbar>
            <h1 className="tituloRegisterUser">Register User</h1>
            <div className="form">
            <div>
            <input type="text" name="firstName" placeholder="First Name" onChange={(e)=>{
              setfirstName(e.target.value)
            }}/> 
            </div>
            <div>
            <input type="text" name="lastName"  placeholder="Last Name" onChange={(e)=>{
              setlastName(e.target.value)
            }}/>
            </div>
            <div>
            <input type="password" name="password"  placeholder="Password" onChange={(e)=>{
              setpassword(e.target.value)
            }}/>
            </div>
            <div>
            <input type="number" name="userStatus"  placeholder="User Status" onChange={(e)=>{
              setuserStatus(e.target.value)
            }}/>
            </div>
            <div>
            <input type="text" name="phone"  placeholder="Phone" onChange={(e)=>{
              setphone(e.target.value)
            }}/>
            </div>
            <div>
            <input type="text" name="email"  placeholder="Email" onChange={(e)=>{
              setemail(e.target.value)
            }}/>
            </div>
            <div>
            <input type="text" name="username"  placeholder="Username" onChange={(e)=>{
              setusername(e.target.value)
            }}/>
            </div>
              <button className="button" onClick={submitlastName}>Submit</button>
            </div>
        </div>
      );
    }

    export default RegisterUser;
