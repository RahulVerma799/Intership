import React, { useState, useContext } from 'react';
import axios from 'axios';
import { FaRegUserCircle, FaEnvelope, FaLock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';

const Login = () => {
  const { login } = useContext(AuthContext);
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    dateOfbirth: '',
    rememberMe: false,
  });
  const navigate = useNavigate();
  const today = new Date().toISOString().split('T')[0];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password.length < 6) {
      alert('Password must be at least 6 characters long.');
      return;
    }

    if (!isSigningUp && !formData.rememberMe) {
      alert('Please check the "Remember Me" checkbox to proceed.');
      return;
    }

    try {
      if (isSigningUp) {
        await axios.post('http://localhost:4000/api/signup', formData);
        alert('Registration successful! Please log in.');
        setIsSigningUp(false);
      } else {
        const res = await axios.post('http://localhost:4000/api/login', {
          email: formData.email,
          password: formData.password,
        });

        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));

        if (formData.rememberMe) {
          localStorage.setItem('token', res.data.token);
        } else {
          sessionStorage.setItem('token', res.data.token);
        }

        login(res.data.token, res.data.user);

        alert('Login successful!');
        navigate('/table');
      }
    } catch (err) {
      console.log(err);
      alert(isSigningUp ? 'Registration failed!' : 'Login failed!');
    }
  };

  const toggleForm = () => {
    setIsSigningUp(!isSigningUp);
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-b from-green-950 to-teal-700">
      <div
        className="bg-gray-800 w-96 rounded-lg shadow-lg overflow-visible relative"
        style={{ paddingTop: '40px' }}
      >
        <div
          className="absolute left-1/2 transform -translate-x-1/2"
          style={{
            top: '-20px',
            zIndex: 10,
          }}
        >
          <button
            onClick={toggleForm}
            className="bg-gray-400 text-white py-3 px-8 hover:bg-teal-500 focus:outline-none shadow-md"
          >
            {isSigningUp ? 'SIGN IN' : 'SIGN UP'}
          </button>
        </div>

        <div className="bg-gray-800 text-center py-8 relative">
          <div className="flex justify-center">
            <FaRegUserCircle className="text-gray-300 text-7xl" />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {isSigningUp && (
            <>
              <div className="relative mb-4">
                <FaRegUserCircle className="absolute top-3 left-3 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full pl-10 pr-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-400"
                />
              </div>
              <div className="relative mb-4">
                <input
                  type="date"
                  name="dateOfbirth"
                  value={formData.dateOfbirth}
                  onChange={handleInputChange}
                  required
                  max={today}
                  className="w-full pl-4 pr-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-400"
                />
              </div>
            </>
          )}
          <div className="relative mb-4">
            <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full pl-10 pr-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
          </div>
          <div className="relative mb-4">
            <FaLock className="absolute top-3 left-3 text-gray-400" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              required
              className="w-full pl-10 pr-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
          </div>

          {!isSigningUp && (
            <div className="flex justify-between items-center mb-4">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                  className="form-checkbox text-teal-400"
                />
                <span className="text-gray-300 text-sm">Remember Me</span>
              </label>
              <button
                type="button"
                onClick={() => alert('Password recovery is not yet implemented.')}
                className="text-teal-400 hover:underline focus:outline-none text-sm"
              >
                Forgot Password?
              </button>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-400"
          >
            {isSigningUp ? 'Register' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
