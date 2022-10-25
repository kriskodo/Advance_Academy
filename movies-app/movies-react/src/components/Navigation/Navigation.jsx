import React from 'react';
import { Link } from "react-router-dom";
import {
    MDBNavbar,
    MDBContainer,
    MDBCollapse, MDBNavbarBrand,
} from 'mdb-react-ui-kit';
import "./Navigation.css";

function Navigation(props) {
    return (
        <header>
            <MDBNavbar expand='lg' light bgColor='light'>
                <MDBContainer fluid>
                    <MDBNavbarBrand href='#'>Movies App</MDBNavbarBrand>
                    <MDBCollapse navbar show={true}>
                            <Link to="/home">Home</Link>
                            <Link to="/movies">Movies</Link>
                    </MDBCollapse>
                </MDBContainer>
            </MDBNavbar>
        </header>
    );
}

export default Navigation;
