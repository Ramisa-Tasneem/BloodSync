import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/welcome.css";
import Navbar from "./Navbar";
import axios from "axios";

const Welcome = () => {
  const [inventory, setInventory] = useState({
    blood_group_data: [],
    total_data: {},
  });

  const fetchInventory = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/allInventory"
      );
      if (response.status === 200) {
        setInventory({
          blood_group_data: response.data.blood_group_data,
          total_data: response.data.total_data,
        });
        console.log(response.data.blood_group_data);
      } else {
        console.log("Something went wrong");
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);


  const stats = [
    { label: "Available Donors", value: 5 },
    { label: "Total Requests", value: 9 },
    { label: "Total Blood Unit (ml)", value: 8050 },
    { label: "Approved Requests", value: 6 },
  ];

  return (
    <div>
      {/* <Navbar/> */}
      <div className="flex h-screen">
        <aside className="sidebar">
          <h2>BloodSync</h2>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/donor">Donor</Link>
              </li>
              <li>
                <Link to="/bloodstock">Blood Stock</Link>
              </li>
              <li>
                <Link to="/donations">Blood Request</Link>
              </li>
              <li>
                <Link to="/Donor-Health-History">Donor Health History</Link>
              </li>
            </ul>
          </nav>
        </aside>
        <div className="main-content">
          <div className="top-bar">
            <h2>Welcome to Home Page</h2>
            <button className="logout-btn">Administrator</button>
          </div>
          {/* <div className="blood-stock">
                    {inventory && inventory.map((blood) => (
                        <div key={blood.type} className="blood-card">
                            <h3>{blood.blood_group}</h3>
                            <p>{blood.total_volume}</p>
                        </div>
                    ))}
                </div> */}
          <div className="blood-stock">
            {inventory.blood_group_data &&
              inventory.blood_group_data.map((blood) => (
                <div key={blood.blood_group} className="blood-card">
                  <h3>{blood.blood_group}</h3>
                  <p>Total Donors: {blood.total_donors}</p>
                  <p>Total Volume: {blood.total_volume}</p>
                </div>
              ))}
          </div>
          {/* <div className="stats-grid">
            <div className="stat-card">
              <h3>Total Donors: {inventory.total_data.total_donors}</h3>
              <h3>Total Blood Volume: {inventory.total_data.total_volume}</h3>
            </div>
          </div> */}

          <div className="stats-grid">
            
              <div className="stat-card">
                <h3>Available Donors</h3>
                <p>{inventory.total_data.total_donors}</p>
              </div>
            
          </div>
          <div className="stats-grid">
            
              <div className="stat-card">
                <h3>Total Blood Unit (ml)</h3>
                <p>{inventory.total_data.total_volume}</p>
              </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
