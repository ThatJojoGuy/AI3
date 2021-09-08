import { useState, useEffect, Component } from 'react';
import Axios from 'axios'
import * as ReactBootStrap from "react-bootstrap"
import React from "react";
import { Link } from "react-router-dom";
import Cookies from 'universal-cookie';

const accessToken = ''
const cookies = new Cookies();
cookies.set('token', accessToken);
console.log(cookies.get('token'));

function RegisterProduct() {

    const [name, setname] = useState('');
    const [categoryName, setcategoryName] = useState('');
    const [categoryId, setcategoryId] = useState('');
    const [status, setstatus] = useState('');

    const submitlastName = () => {
        Axios({
            headers: {
                "x-access-token": `Bearer ${accessToken}`
            },
            method: 'post',
            url: '',
            data: {
                "name": name,
                "categoryName": categoryName,
                "categoryId": parseInt(categoryId),
                "status": status
            }
        }).then(() => {
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
            <h1 className="tituloRegisterUser">Register Product</h1>
            <div className="form">
                <div>
                    <input type="text" name="name" placeholder="Name" onChange={(e) => {
                        setname(e.target.value)
                    }} />
                </div>
                <div>
                    <input type="text" name="categoryName " placeholder="Category Name " onChange={(e) => {
                        setcategoryName(e.target.value)
                    }} />
                </div>
                <div>
                    <input type="text" name="categoryId " placeholder="Category Id" onChange={(e) => {
                        setcategoryId(e.target.value)
                    }} />
                </div>
                <div>
                    <input type="text" name="status " placeholder="Status" onChange={(e) => {
                        setstatus(e.target.value)
                    }} />
                </div>
                <button className="button" onClick={submitlastName}>Submit</button>
            </div>
        </div>
    );
}

export default RegisterProduct;
