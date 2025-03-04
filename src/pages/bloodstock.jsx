import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/BloodStock.css";
import { FaSearch } from "react-icons/fa";
import axios from "axios";

const BloodStock = () => {
    const [search, setSearch] = useState("");
    const [data, setData] = useState([]);
    const [editRowId, setEditRowId] = useState(null); // ✅ Track which row is being edited
    const [editFormData, setEditFormData] = useState({}); // ✅ Store edited values
    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get("http://localhost:8000/bloodstock/all");
            setData(response.data);
        } catch (error) {
            console.error("Error fetching blood stock data:", error);
        }
    };

    const handleSearch = (event) => {
        setSearch(event.target.value);
    };

    const filteredData = data.filter(item =>
        item.donor.toLowerCase().includes(search.toLowerCase()) ||
        item.blood_group.toLowerCase().includes(search.toLowerCase())
    );

    const handleDelete = async (blood_id) => {
        if (!blood_id) {
            alert("Invalid blood ID");
            return;
        }

        try {
            const response = await axios.delete(`http://localhost:8000/bloodstock/bloodStock`, {
                data: { blood_id }
            });

            if (response.status === 200) {
                alert("Deleted successfully");
                fetchData();
            }
        } catch (error) {
            console.error("Delete failed:", error);
            alert("Failed to delete record");
        }
    };

    // ✅ Enable edit mode
    const handleEditClick = (row) => {
        setEditRowId(row.blood_id);
        setEditFormData(row); // Set initial values for the row being edited
    };

    // ✅ Handle input change in edit mode
    const handleEditChange = (event) => {
        const { name, value } = event.target;
        setEditFormData({ ...editFormData, [name]: value });
    };

    // ✅ Save changes
    const handleSaveClick = async () => {
        console.log(editFormData)
        
        try {
            await axios.put(`http://localhost:8000/bloodstock/update`, editFormData);
            alert("Updated successfully!");
            setEditRowId(null); // Exit edit mode
            fetchData(); // Refresh data
        } catch (error) {
            console.error("Update failed:", error);
            alert("Failed to update record");
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
                            {editRowId === row.blood_id ? (
                                    <>
                                    <td>
                                        <input 
                                            type="text" 
                                            name="donor" 
                                            value={editFormData.donor} 
                                            onChange={handleEditChange} 
                                        />
                                    </td>
                                    <td>
                                        <input 
                                            type="date" 
                                            name="donated_date" 
                                            value={new Date(editFormData.donated_date).toISOString().split("T")[0]} 
                                            onChange={handleEditChange} 
                                        />
                                    </td>
                                    <td>
                                        <input 
                                            type="date" 
                                            name="expired_date" 
                                            value={new Date(editFormData.expired_date).toISOString().split("T")[0]} 
                                            onChange={handleEditChange} 
                                        />
                                    </td>
                                    <td>
                                        <select 
                                            name="blood_group" 
                                            value={editFormData.blood_group} 
                                            onChange={handleEditChange}
                                        >
                                            <option value="">Select Blood Group</option>
                                            <option value="A+">A+</option>
                                            <option value="A-">A-</option>
                                            <option value="B+">B+</option>
                                            <option value="B-">B-</option>
                                            <option value="O+">O+</option>
                                            <option value="O-">O-</option>
                                            <option value="AB+">AB+</option>
                                            <option value="AB-">AB-</option>
                                        </select>
                                    </td>
                                    <td>
                                        <input 
                                            type="number" 
                                            name="volume" 
                                            value={editFormData.volume} 
                                            onChange={handleEditChange} 
                                        />
                                    </td>
                                    <td>
                                        <button className="save-btn" onClick={handleSaveClick}>Save</button>
                                        <button className="cancel-btn" onClick={() => setEditRowId(null)}>Cancel</button>
                                    </td>
                                </>
                            ) : (
                                <>
                                    <td>{row.donor}</td>
                                    <td>{new Date(row.donated_date).toISOString().split("T")[0]}</td>
                                    <td>{new Date(row.expired_date).toISOString().split("T")[0]}</td>
                                    <td>{row.blood_group}</td>
                                    <td>{row.volume}</td>
                                    <td className="action-data">
                                        <button className="edit-btn" onClick={() => handleEditClick(row)}>Edit</button>
                                        <button onClick={() => handleDelete(row.blood_id)} className="delete-btn">Delete</button>
                                    </td>
                                </>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BloodStock;
