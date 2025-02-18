import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/BloodStock.css";
import { FaSearch } from "react-icons/fa";
import axios from "axios";

const BloodStock = () => {
    const [search, setSearch] = useState("");
    const [data, setData] = useState([]); // ✅ Fix: Use an array for data
    const navigate = useNavigate();

    const handleSearch = (event) => {
        setSearch(event.target.value);
    };

    const fetchData = async () => {
        try {
            const response = await axios.get("http://localhost:8000/bloodstock/all");
            console.log(response.data);
            setData(response.data); // ✅ Fix: Set the entire array from API response
        } catch (error) {
            console.error("Error fetching blood stock data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const filteredData = data.filter(item =>
        item.donor.toLowerCase().includes(search.toLowerCase()) ||
        item.blood_group.toLowerCase().includes(search.toLowerCase()) // ✅ Fix: Use correct field names from API
    );
    
    const handleDelete = async (blood_id) => {
        if (!blood_id) {
            alert("Invalid blood ID");
            return;
        }
    
        try {
            const response = await axios.delete(`http://localhost:8000/bloodstock/bloodStock`, {
                data: { blood_id }  // ✅ Correct way to send body in DELETE request
            });
    
            if (response.status === 200) {
                alert("Deleted successfully");
                fetchData(); // Refresh data after deletion
            }
        } catch (error) {
            console.error("Delete failed:", error);
            alert("Failed to delete record");
        }
    };
    
    return (
        <div className="blood-stock-container">
            <h2 className="title">Blood Stock</h2>
            
            <div className="search-bar-container">
                <FaSearch className="search-icon" />
                <input 
                    type="text" 
                    placeholder="Search by donor or blood group" 
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
                {filteredData.map((row) => (
                <tr key={row.blood_id}>
                    <td>{row.blood_id}</td>
                    <td>{row.donor}</td>
                    <td>{new Date(row.donated_date).toISOString().split("T")[0]}</td> {/* ✅ Show only date */}
                    <td>{new Date(row.expired_date).toISOString().split("T")[0]}</td> {/* ✅ Show only date */}
                    <td>{row.blood_group}</td>
                    <td>{row.volume}</td>
                    <td className="action-data">
                        <button className="edit-btn">Edit</button>
                        <button onClick={()=>handleDelete(row.blood_id)} className="delete-btn">Delete</button>
                    </td>
                </tr>
            ))}

                </tbody>
            </table>
        </div>
    );
};

export default BloodStock;
