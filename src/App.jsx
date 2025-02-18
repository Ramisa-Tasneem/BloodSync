import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/register';
import Login from './pages/login';
import Donor from './pages/donor';
import BloodStock from './pages/bloodstock';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Welcome />} />
        <Route path="/donor" element={<Donor />} />
        <Route path="/bloodstock" element={<BloodStock />} />

      </Routes>
    </Router>
  );
};

export default App;
