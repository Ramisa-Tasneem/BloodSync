import React from "react";
import { Link } from "react-router-dom";
import "../styles/welcome.css";
import Navbar from "./Navbar";

const Welcome = () => {
    const bloodData = [
        { type: "A+", amount: "60ml" },
        { type: "B+", amount: "960ml" },
        { type: "O+", amount: "955ml" },
        { type: "AB+", amount: "525ml" },
        { type: "A-", amount: "2560ml" },
        { type: "B-", amount: "960ml" },
        { type: "O-", amount: "920ml" },
        { type: "AB-", amount: "1110ml" },
    ];

    const stats = [
        { label: "Available Donors", value: 5 },
        { label: "Total Requests", value: 9 },
        { label: "Total Blood Unit (ml)", value: 8050 },
        { label: "Approved Requests", value: 6 },
    ];

    return (

            <div>
                <Navbar/>
        <div className="flex h-screen">

            <aside className="sidebar">
                <h2>BloodSync</h2>
                <nav>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/donor">Donor</Link></li>
                        <li><Link to="/bloodstock">Blood Stock</Link></li>
                        <li><Link to="/donations">Blood Request</Link></li>
                        <li><Link to="/Donor-Health-History">Donor Health History</Link></li>

                    </ul>
                </nav>
            </aside>
            <div className="main-content">
                <div className="top-bar">
                    <h2>Welcome to Home Page</h2>
                    <button className="logout-btn">Administrator</button>
                </div>
                <div className="blood-stock">
                    {bloodData.map((blood) => (
                        <div key={blood.type} className="blood-card">
                            <h3>{blood.type}</h3>
                            <p>{blood.amount}</p>
                        </div>
                    ))}
                </div>
                <div className="stats-grid">
                    {stats.map((stat) => (
                        <div key={stat.label} className="stat-card">
                            <h3>{stat.value}</h3>
                            <p>{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
                    </div>
        </div>
    );
};

export default Welcome;























