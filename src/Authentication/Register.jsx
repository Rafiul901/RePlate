import React, { useState, useRef, useContext } from 'react';
import { Link, useNavigate } from 'react-router';
import { FaUser, FaEnvelope, FaLock, FaCamera, FaEye, FaEyeSlash } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { AuthContext } from './AuthContext';
import { updateProfile } from 'firebase/auth';
// ImgBB API key - replace with your actual API key
const IMGBB_API_KEY = import.meta.env.VITE_IMGBB_API_KEY;


const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    photo: null
  });
  const [errors, setErrors] = useState({});
  const [preview, setPreview] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
      setFormData({
        ...formData,
        photo: file
      });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (!formData.photo) newErrors.photo = 'Profile photo is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const uploadImageToImgBB = async (file) => {
    try {
      const formData = new FormData();
      formData.append('image', file);
      
      const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
        method: 'POST',
        body: formData
      });
      
      const result = await response.json();
      
      if (result.success) {
        return result.data.url;
      } else {
        throw new Error(result.error?.message || 'Image upload failed');
      }
    } catch (error) {
      console.error('Error uploading image to ImgBB:', error);
      throw error;
    }
  };

  const { createUser } = useContext(AuthContext);
  const navigate = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validate()) return;

  setLoading(true);

  try {
    const result = await createUser(formData.email, formData.password);

    const photoURL = await uploadImageToImgBB(formData.photo);

    await updateProfile(result.user, {
      displayName: formData.name,
      photoURL: photoURL
    });

    // ✅ Save to backend with default role
    await fetch(`https://replate-backend.vercel.app/users/${formData.email}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        photo: photoURL,
        role: 'user' // default
      })
    });

    Swal.fire({
      icon: 'success',
      title: 'Registration Successful!',
      text: 'Welcome to RePlate!',
      timer: 2000,
      showConfirmButton: false
    });

    navigate('/');
  } catch (error) {
    console.error(error);
    Swal.fire({
      icon: 'error',
      title: 'Registration Failed',
      text: error.message
    });
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-center">
          <h1 className="text-3xl font-bold text-white">Create Account</h1>
          <p className="text-blue-100 mt-2">Join our community today</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Profile Photo Upload */}
          <div className="flex flex-col items-center">
            <div 
              className="relative w-24 h-24 rounded-full bg-gray-200 border-4 border-white shadow-md cursor-pointer"
              onClick={() => fileInputRef.current.click()}
            >
              {preview ? (
                <img 
                  src={preview} 
                  alt="Preview" 
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <div className="w-full h-full rounded-full flex items-center justify-center text-gray-400">
                  <FaCamera size={30} />
                </div>
              )}
              <div className="absolute bottom-0 right-0 bg-blue-500 text-white p-1 rounded-full">
                <FaCamera size={14} />
              </div>
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              accept="image/*"
              className="hidden"
            />
            {errors.photo && <p className="text-red-500 text-sm mt-1">{errors.photo}</p>}
          </div>

          {/* Name Field */}
          <div className="space-y-1">
            <label className="block text-gray-700">Full Name</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaUser className="text-gray-400" />
              </div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder=""
                className={`w-full pl-10 pr-4 py-2 rounded-lg border ${errors.name ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
            </div>
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>

          {/* Email Field */}
          <div className="space-y-1">
            <label className="block text-gray-700">Email Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaEnvelope className="text-gray-400" />
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder=""
                className={`w-full pl-10 pr-4 py-2 rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
            </div>
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          {/* Password Field */}
          <div className="space-y-1">
            <label className="block text-gray-700">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLock className="text-gray-400" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                pattern="^(?=.*[a-z])(?=.*[A-Z]).{6,}$"
                className={`w-full pl-10 pr-10 py-2 rounded-lg border ${errors.password ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <FaEyeSlash className="text-gray-400 hover:text-gray-600" />
                ) : (
                  <FaEye className="text-gray-400 hover:text-gray-600" />
                )}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3 px-4 rounded-lg font-semibold shadow-md hover:bg-gradient-to-r hover:from-green-600 hover:to-emerald-700 hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating Account...' : 'Register Now'}
          </button>

          {/* Login Link */}
          <div className="text-center text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 hover:underline font-medium">
              Login here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;