import { useState } from "react";
import Axios from 'axios'
import * as ReactBootStrap from "react-bootstrap"
import React from "react";
import { Link } from "react-router-dom";
import Cookies from 'universal-cookie';

const AccessToken = '';
const cookies = new Cookies();
cookies.set('token', accessToken);
console.log(cookies.get('token'));

function RegisterOrder() {

    const [productId, setproductId] = useState('');
    const [userId, setuserId] = useState('');
    const [quantity, setquantity] = useState('');
    const [shipDate, setshipDate] = useState('');
    const [status, setStatus] = useState('');
    const [complete, setComplete] = useState('');

    const submitlastName = () => {
        Axios({
            headers: {
                "x-access-token": `Bearer ${accessToken}`
            },
            method: 'post',
            url: '',
            data: {
                "productId": parseInt(productId),
                "userId": parseInt(userId),
                "quantity": parseInt(quantity),
                "shipDate": shipDate,
                "status": status,
                "complete": JSON.parse(complete)
            }
        }).then(() => {
            alert('sucesso');
        });
    };
    const handleRemoveCookie = () => {
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
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
                    <input type="number" name="productId" placeholder="Product Id" onChange={(e) => {
                        setproductId(e.target.value)
                    }} />
                </div>
                <div>
                    <input type="number" name="userId" placeholder="User Id" onChange={(e) => {
                        setuserId(e.target.value)
                    }} />
                </div>
                <div>
                    <input type="number" name="quantity" placeholder="Quantity" onChange={(e) => {
                        setquantity(e.target.value)
                    }} />
                </div>
                <div>
                    <input type="text" name="shipDate" placeholder="Ship Date" onChange={(e) => {
                        setshipDate(e.target.value)
                    }} />
                </div>
                <div>
                    <input type="text" name="status" placeholder="Status" onChange={(e) => {
                        setstatus(e.target.value)
                    }} />
                </div>
                <div>
                    <input type="text" name="complete" placeholder="Complete" onChange={(e) => {
                        setcomplete(e.target.value)
                    }} />
                </div>
                <button className="button" onClick={submitlastName}>Submit</button>
            </div>
        </div>
    );
}
export default RegisterOrder;