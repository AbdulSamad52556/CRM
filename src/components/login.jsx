// src/components/Login.jsx
import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const role = await login(email, password); 
            console.log(role)
            navigate(role);
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <div className="bg-[#10002B] min-h-[100vh] flex flex-col justify-center items-center">
        <div className="w-full h-[80%]">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-10 max-w-md mx-auto p-10 border rounded-xl shadow-lg h-full border-[#5A189A]"
          >
            <h2 className="text-2xl text-white font-bold mb-4">LogIn</h2>
            <div className="flex flex-col gap-4">
              
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="block w-full p-3 mb-2 border text-gray-300 rounded-3xl focus:outline-none bg-[#ffffff00] border-[#5A189A]"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="block w-full p-3 mb-2 border text-gray-300 focus:outline-none bg-[#ffffff00] border-[#5A189A] rounded-3xl"
              />
              
            </div>
            <button
              type="submit"
              className="w-full bg-[#5A189A] hover:bg-[#3C096C] text-gray-300 duration-200 p-2 rounded-3xl"
            >
              LogIn
            </button>
            <p className='text-gray-300 text-center'>Don't have an account? <a href="/signup" className='text-[#5A189A]'>signup</a></p>
          </form>
        </div>
      </div>
    );
};

export default Login;
