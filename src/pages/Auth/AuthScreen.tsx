import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance';
import React, { useState } from 'react';
import Logo from "../../assets/img/logo.png";

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

const AuthScreens: React.FC = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [loading, setLoading] = useState(false);
  
  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors: FormErrors = {};

    if (!isSignIn && !name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (!isSignIn && password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);

    if (isSignIn) {
      await login(email);
    } else {
      await register(name, email, password, confirmPassword);
    }

    setLoading(false);
  };

  const login = async (email: string) => {
    try {
      const response = await axiosInstance.post('/auth', { email });
      localStorage.setItem('user', JSON.stringify(response.data.user));
      localStorage.setItem('userId', response.data.user.user_id);
      localStorage.setItem('userRole', 'user');
      navigate("/home");
    } catch (error) {
      console.error(error);
    }
  };

  const register = async (name: string, email: string, password: string, confirmPassword: string) => {
    try {
      const response = await axiosInstance.post('/users/register', {
        name,
        email,
      });
      console.log('User registered:', response.data);
      if (response.data) {
        setIsSignIn(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-amber-100 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        {/* Logo placeholder */}
        <div className="w-16 h-16 bg-amber-200 rounded-2xl mx-auto mb-4 flex items-center justify-center">
          <img src={Logo} alt="Logo" />
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent mb-2">
            {isSignIn ? 'Welcome Back!' : 'Create Account'}
          </h2>
          <p className="text-gray-600">
            {isSignIn 
              ? 'Enter your credentials to access your account' 
              : 'Fill in the form to create your account'
            }
          </p>
        </div>

        {/* Tabs */}
        <div className="flex mb-8 bg-gray-100 rounded-lg p-1">
          <button
            className={`flex-1 py-2 px-4 rounded-md transition-all duration-200 ${
              isSignIn 
                ? 'bg-white text-amber-600 shadow-sm' 
                : 'text-gray-600 hover:text-amber-600'
            }`}
            onClick={() => setIsSignIn(true)}
          >
            Sign In
          </button>
          <button
            className={`flex-1 py-2 px-4 rounded-md transition-all duration-200 ${
              !isSignIn 
                ? 'bg-white text-amber-600 shadow-sm' 
                : 'text-gray-600 hover:text-amber-600'
            }`}
            onClick={() => setIsSignIn(false)}
          >
            Sign Up
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {!isSignIn && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`w-full px-4 py-2 rounded-lg border ${
                  errors.name 
                    ? 'border-red-500 focus:ring-red-500' 
                    : 'border-gray-300 focus:ring-amber-500'
                } focus:border-transparent focus:ring-2 transition-colors`}
                placeholder="John Doe"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-500">{errors.name}</p>
              )}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-4 py-2 rounded-lg border ${
                errors.email 
                  ? 'border-red-500 focus:ring-red-500' 
                  : 'border-gray-300 focus:ring-amber-500'
              } focus:border-transparent focus:ring-2 transition-colors`}
              placeholder="you@example.com"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full px-4 py-2 rounded-lg border ${
                  errors.password 
                    ? 'border-red-500 focus:ring-red-500' 
                    : 'border-gray-300 focus:ring-amber-500'
                } focus:border-transparent focus:ring-2 transition-colors pr-10`}
                placeholder="Minimum 8 characters"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-amber-600 transition-colors"
              >
                {showPassword ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/>
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.522 5 12 5c4.478 0 8.268 2.943 9.543 7a10.05 10.05 0 01-1.563 3.029 9.971 9.971 0 01-3.28 2.976m-5.858-.908a3 3 0 01-4.243-4.243M9.878 9.878l4.242 4.242"/>
                  </svg>
                )}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">{errors.password}</p>
            )}
          </div>

          {!isSignIn && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`w-full px-4 py-2 rounded-lg border ${
                  errors.confirmPassword 
                    ? 'border-red-500 focus:ring-red-500' 
                    : 'border-gray-300 focus:ring-amber-500'
                } focus:border-transparent focus:ring-2 transition-colors`}
                placeholder="••••••••"
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>
              )}
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-amber-500 text-white rounded-lg py-2 hover:bg-amber-600 transition-colors"
            >
              {loading ? 'Loading...' : isSignIn ? 'Sign In' : 'Sign Up'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthScreens;
