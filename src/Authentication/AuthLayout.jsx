import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../RootLayout/Navbar';
import Footer from '../Homepage/Footer';


const AuthLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default AuthLayout;