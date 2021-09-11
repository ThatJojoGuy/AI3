import { useState} from 'react';
import Axios from 'axios'
import * as ReactBootStrap from "react-bootstrap"
import React from "react";
import {Link} from "react-router-dom";
import Cookies from 'universal-cookie';

const accessToken = ''
const cookies = new Cookies();
cookies.set('token',  accessToken);
console.log(cookies.get('token'));

function RegisterOrder() {
  
    const[productId, setproductId] = useState('');
    const[userId, setuserId] = useState('');
    const[quantity, setquantity] = useState('');
    const[shipDate, setshipDate] = useState('');
    const[status , setstatus] = useState('');
    const[complete , setcomplete] = useState('');
    
    const submitlastName = () => {
      Axios({
        headers: { 
         "x-access-token": `Bearer ${accessToken}`
        },
        method:'post',
        url:'http://localhost:8080/v2/order',
        data:{
          "productId": parseInt(productId),
          "userId": parseInt(userId),
          "quantity": parseInt(quantity),
         "shipDate": shipDate,
          "status": status,
          "complete": JSON.parse(complete)}
      }).then(()=>{
        alert('sucesso');
      });
    }; 

  //logout
  const handleRemoveCookie = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    };

      return (
        <div className="App">
<ReactBootStrap.Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
  <ReactBootStrap.Navbar.Brand href="#home">Nameless Company</ReactBootStrap.Navbar.Brand>
  <ReactBootStrap.Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <ReactBootStrap.Navbar.Collapse id="responsive-navbar-nav">
    <ReactBootStrap.Nav className="mr-auto">
    <ReactBootStrap.Nav.Link><Link to="/user">User</Link></ReactBootStrap.Nav.Link>
      <ReactBootStrap.Nav.Link><Link to="/product">Product</Link></ReactBootStrap.Nav.Link>
      <ReactBootStrap.NavDropdown title="Order" id="collasible-nav-dropdown">
        <ReactBootStrap.NavDropdown.Item ><Link to="/orderRegister">Register Order</Link></ReactBootStrap.NavDropdown.Item>
        <ReactBootStrap.NavDropdown.Item ><Link to="/orderUpdate">Update Order</Link></ReactBootStrap.NavDropdown.Item>
      </ReactBootStrap.NavDropdown>
      <ReactBootStrap.Form inline>
      <ReactBootStrap.Button variant="outline-success" className="logout" onClick={handleRemoveCookie} >Logout</ReactBootStrap.Button>
    </ReactBootStrap.Form>
    </ReactBootStrap.Nav>
  </ReactBootStrap.Navbar.Collapse>
</ReactBootStrap.Navbar>
            <h1 className="tituloRegisterUser">Register Order</h1>
            <div className="form">
            <div>
              <label for="productId" style={{width: "9rem"}}>Id Product</label>
            <input id="IdProduto" type="number" name="productId" placeholder="0" onChange={(e)=>{
              setproductId(e.target.value)
            }}/> 
            </div>
            <div>
            <label for="userId" style={{width: "9rem"}}>Id User</label>
            <input type="number" name="userId" placeholder="0" onChange={(e)=>{
              setuserId(e.target.value)
            }}/>
            </div>
            <div>
            <label for="quantity" style={{width: "9rem"}}>Quantity</label>
            <input type="number" name="quantity" placeholder="0" onChange={(e)=>{
              setquantity(e.target.value)
            }}/>
            </div>
            <div>
            <label for="shipDate" style={{width: "9rem"}}>Ship Date</label>
            <input type="text" name="shipDate" placeholder="2000-01-23T04:56:07.000+00:00" onChange={(e)=>{
              setshipDate(e.target.value)
            }}/>
            </div>
            <div>
            <label for="status" style={{width: "9rem"}}>Order Status</label>
            <input type="text" name="status" placeholder="placed/approved/delivered" onChange={(e)=>{
              setstatus(e.target.value)
            }}/>
            </div>
            <div>
            <label for="Complete" style={{width: "9rem"}}>Complete</label>
            <input type="text" name="complete" placeholder="true/false" onChange={(e)=>{
              setcomplete(e.target.value)
            }}/>
            </div>
                <button className="button" onClick={submitlastName}>Submit</button>
            </div>
        </div>
      );
    }

export default RegisterOrder;
