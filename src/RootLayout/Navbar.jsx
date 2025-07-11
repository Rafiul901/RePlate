import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router'; // ✅ Corrected import
import logo from '../assets/logo.png';
import icon1 from '../assets/user.png';

import Swal from 'sweetalert2';
import { AuthContext } from '../Authentication/AuthContext';

const Navbar = () => {
  const navigate = useNavigate();
  const { user, googleSignIn, signOutUser } = useContext(AuthContext);

  const handleGoogleLogin = async () => {
    try {
      await googleSignIn();
      Swal.fire({
        icon: 'success',
        title: 'Login Successful',
        timer: 1500,
        showConfirmButton: false
      });
      navigate('/');
    } catch (error) {
      console.error('Google Sign-In Error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: error.message
      });
    }
  };

  const handleLogOut = async () => {
    try {
      await signOutUser();
      Swal.fire({
        icon: 'success',
        title: 'Logged out',
        timer: 1000,
        showConfirmButton: false
      });
    } catch (error) {
      console.error('Logout Error:', error);
    }
  };

  const links = (
    <>
      <li><Link className='text-blue-800 font-semibold' to='/'>Home</Link></li>
      <li><Link className='text-blue-800 font-semibold' to='/allDonation'>All Donations</Link></li>
      <li><Link className='text-blue-800 font-semibold' to='/dashboard'>Dashboard</Link></li>
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
            {links}
          </ul>
        </div>
        <div className='flex items-center gap-2'>
          <img className='w-10 md:w-16 hidden md:inline rounded-full' src={logo} alt="Logo" />
          <span className="text-xl text-cyan-700 font-bold">RePlate</span>
        </div>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <div className='flex gap-3'>{links}</div>
        </ul>
      </div>

      <div className="navbar-end gap-2">
        <div className="tooltip tooltip-left" data-tip={user?.displayName || 'Guest'}>
          {user ? (
            <img className="w-10 h-10 rounded-full object-cover" src={user.photoURL} alt="User" />
          ) : (
            <img className="w-10 h-10" src={icon1} alt="Default Icon" />
          )}
        </div>

        {user ? (
          <button onClick={handleLogOut} className='btn border-2 border-blue-500 bg-gradient-to-r from-cyan-400 to-blue-600 text-white hover:from-green-500 hover:to-green-700'>
            LogOut
          </button>
        ) : (
                    <Link to='/login' className="btn border-2 border-blue-500 bg-gradient-to-r from-green-400 to-green-600 text-white hover:from-blue-500 hover:to-blue-700">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
