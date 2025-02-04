// src/pages/Login.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    // State hooks for form fields
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        
    };
 

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:8000/api/login', formData);
            console.log('Login successful:', response.data);
            alert('Login successful');
            
            // You can handle successful login here, e.g., redirecting the user or storing tokens
        } catch (error) {
            console.error('Login failed:', error);
            // Handle login failure, e.g., showing an error message to the user
        }
    };
    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Login attempt:', formData);

        // You can add logic to authenticate the user here
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button onClick={handleLogin}>Login</button>
            </form>
            <p>
                Don't have an account? <Link to="/register">Register here</Link>
            </p>
        </div>
    );
};

export default Login;
