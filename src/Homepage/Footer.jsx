import React from 'react';
import logo from '../assets/logo.png';
import fb from '../assets/fb.jpg';
import x from '../assets/x.png';
import yt from '../assets/download.png';

const Footer = () => {
    return (
       <footer className="footer sm:footer-horizontal bg-cyan-950 text-neutral-content p-10 mt-10">
            <aside>
                <img className='w-16 h-16 rounded-xl' src={logo} alt="" />
                <p>
                    <span className='font-bold text-xl text-blue-400'>RePlate</span>
                    <br />
                    Rescue Food, RePlate Hope
                </p>
            </aside>

            <nav>
                <h6 className="footer-title">Legal</h6>
                <a className="link link-hover" href="/about">About Us</a>
                <a className="link link-hover" href="/contact">Contact Us</a>
                <a className="link link-hover" href="/terms">Terms & Conditions</a>
            </nav>

            <nav>
                <h6 className="footer-title">Social</h6>
                <div className="grid grid-flow-col gap-4">
                    <a href="https://www.facebook.com/rmamit.tajib" target="_blank" rel="noopener noreferrer" >
                        <img className="w-8 rounded-full border-white border-2" src={fb} alt="Facebook" />
                    </a>
                    <a href="https://x.com/Curious093270" target="_blank" rel="noopener noreferrer">
                        <img className="w-8 rounded-full border-white border-2" src={x} alt="X (Twitter)" />
                    </a>
                    <a href="https://www.youtube.com/@eccentric10" target="_blank" rel="noopener noreferrer">
                        <img className="w-8 rounded-full border-white border-2" src={yt} alt="YouTube" />
                    </a>
                </div>
            </nav>

            {/* Copyright notice */}
            <div className="w-full text-center mt-8 text-sm text-gray-400">
                © {new Date().getFullYear()} RePlate. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;