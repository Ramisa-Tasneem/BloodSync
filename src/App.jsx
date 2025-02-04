import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/register';
import Login from './pages/login';
import Welcome from './pages/welcome';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Welcome/>} />
        {/* You can add other routes for home or welcome page here */}
      </Routes>
    </Router>
  );
};

export default App;
