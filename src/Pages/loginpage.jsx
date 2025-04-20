import React, { useState } from 'react';
import Logo from '../assets/logo.png';
import { signIn, signUp } from './Auth'; // Assume you have both methods
import { useNavigate } from 'react-router-dom';

export default function AuthPage() {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isSignUp) {
        await signUp(email, password, name);
        navigate('/');
      } else {
        await signIn(email, password);
        navigate('/');
      }
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-6xl bg-white rounded-lg shadow-lg overflow-hidden flex">
        
        {/* Left Side - Slide Illustration */}
        <div className="hidden md:block md:w-3/5 relative">
          <div className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${isSignUp ? 'opacity-0' : 'opacity-100'}`}>
            <div className="p-8 flex items-center justify-center h-full bg-gradient-to-br from-blue-600 to-blue-400">
              <img
                src="https://img.freepik.com/free-vector/flat-hand-drawn-coworking-space_52683-54823.jpg?uid=R154467872&ga=GA1.1.622978408.1735654898&semt=ais_hybrid&w=740"
                alt="Login Illustration"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${isSignUp ? 'opacity-100' : 'opacity-0'}`}>
            <div className="p-8 flex items-center justify-center h-full bg-gradient-to-br from-purple-600 to-purple-400">
              <img
                src="https://img.freepik.com/free-vector/teamwork-concept-landing-page_52683-20165.jpg?uid=R154467872&ga=GA1.1.622978408.1735654898&semt=ais_hybrid&w=740"
                alt="Signup Illustration"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Right Side - Auth Form */}
        <div className="w-full md:w-2/5 p-8 md:p-16 flex flex-col justify-center items-center">
          <img src={Logo} alt="logo" className="h-12 mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {isSignUp ? "Create Account" : "Welcome to"}  
            <span className="text-indigo-600"> Aurora</span>
          </h1>
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            {isSignUp ? "Sign up to get started" : "Sign in to continue"}
          </h2>

          <form className="w-full space-y-4" onSubmit={handleSubmit}>
            {isSignUp && (
              <input
                type="text"
                placeholder="Full Name"
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            )}
            <input
              type="email"
              placeholder="Email address"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

            <button className="w-full bg-blue-500 text-white py-3 px-6 rounded-md hover:bg-blue-600 transition duration-200">
              {isSignUp ? "Sign Up" : "Log In"}
            </button>
          </form>

          {!isSignUp && (
            <div className="mt-4 text-sm text-blue-500 hover:underline cursor-pointer">
              Forgot password?
            </div>
          )}

          <div className="mt-6 text-sm text-gray-600">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}
            <button
              className="ml-2 text-blue-600 hover:underline"
              onClick={() => setIsSignUp(!isSignUp)}
            >
              {isSignUp ? "Log In" : "Sign Up"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}