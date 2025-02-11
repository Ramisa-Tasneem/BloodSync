
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const navigate= useNavigate()
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

   
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
           // alert('Login successful');
            if(response.status==201){
                localStorage.setItem("token",response.data.token)
                navigate('/')
            }
          
        } catch (error) {
            console.error('Login failed:', error);
           
        }
    };
   
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Login attempt:', formData);

        
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
