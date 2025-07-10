import React from 'react';
import { Outlet } from 'react-router';
import Navbar from './Navbar';
import Footer from '../Homepage/Footer';

const RootLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default RootLayout;