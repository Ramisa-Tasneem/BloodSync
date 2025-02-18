import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from "react-router-dom";
import "../styles/BloodStock.css";
import { FaSearch } from "react-icons/fa";

const initialData = [
    { id: 1, donor: "John Doe", collectionDate: "2025-02-10", expireDate: "2025-05-10", bloodGroup: "A+", volume: 500 },
    { id: 2, donor: "Jane Smith", collectionDate: "2025-03-12", expireDate: "2025-06-12", bloodGroup: "O-", volume: 450 },
    { id: 3, donor: "Mark Lee", collectionDate: "2025-04-15", expireDate: "2025-07-15", bloodGroup: "B+", volume: 400 }
];

const BloodStock = () => {
    const [search, setSearch] = useState("");
    const [data, setData] = useState(initialData);
    const navigate = useNavigate();

    const handleSearch = (event) => {
        setSearch(event.target.value);
    };

    const filteredData = data.filter(item =>
        item.donor.toLowerCase().includes(search.toLowerCase()) ||
        item.bloodGroup.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="blood-stock-container">
            <h2 className="title">Blood Stock</h2>
            
            <div className="search-bar-container">
                <FaSearch className="search-icon" />
                <input 
                    type="text" 
                    placeholder="Search" 
                    value={search} 
                    onChange={handleSearch} 
                    className="search-bar"
                />
            </div>

            <button className="new-entry-btn" onClick={() => navigate("/new-entry")}>New Entry</button>

            <table className="table-container">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Donor</th>
                        <th>Collection Date</th>
                        <th>Expire Date</th>
                        <th>Blood Group</th>
                        <th>Volume (ml)</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map(row => (
                        <tr key={row.id}>
                            <td>{row.id}</td>
                            <td>{row.donor}</td>
                            <td>{row.collectionDate}</td>
                            <td>{row.expireDate}</td>
                            <td>{row.bloodGroup}</td>
                            <td>{row.volume}</td>
                            <td className="action-data">
                                <button className="edit-btn">Edit</button>
                                <button className="delete-btn">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};



export default BloodStock;
