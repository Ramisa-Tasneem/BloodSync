import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/donor.css";

const Donor = () => {
    const [donors, setDonors] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        donor_age: "",
        gender: "",
        blood: "",
        address: "",
        mail: "",
        number: "",
    });

    useEffect(() => {
        fetchDonors();
    }, []);

    const fetchDonors = async () => {
        try {
            const response = await axios.get("http://localhost:8000/api/donors");
            setDonors(response.data);
        } catch (error) {
            console.error("Error fetching donors:", error);
            alert("Failed to load donors.");
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name || !formData.donor_age || !formData.gender || !formData.blood || !formData.address || !formData.mail || !formData.number) {
            alert("Please fill in all fields");
            return;
        }

        try {
            if (isEditing) {
                await axios.put(`http://localhost:8000/api/donors/update-donor/${editId}`, formData);
                alert("Donor updated successfully!");
            } else {
                await axios.post("http://localhost:8000/api/donors/add-donor", formData);
                alert("Donor added successfully!");
            }

            setFormData({
                name: "",
                donor_age: "",
                gender: "",
                blood: "",
                address: "",
                mail: "",
                number: "",
            });
            setShowForm(false);
            setIsEditing(false);
            fetchDonors();
        } catch (error) {
            console.error("Error saving donor:", error);
            alert("Error saving donor. Please try again.");
        }
    };

    const handleEdit = (donor) => {
        setFormData(donor);
        setEditId(donor.donor_id);
        setIsEditing(true);
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this donor?")) {
            try {
                await axios.delete(`http://localhost:8000/api/donors/delete-donor/${id}`);
                alert("Donor deleted successfully!");
                fetchDonors();
            } catch (error) {
                console.error("Error deleting donor:", error);
                alert("Error deleting donor. Please try again.");
            }
        }
    };

    return (
        <div className="donor-page">
            <button className="donor-button" onClick={() => { setShowForm(!showForm); setIsEditing(false); }}>
                {showForm ? "Close Form" : "Add Donor"}
            </button>

            <input
                type="text"
                className="search-box"
                placeholder="Search donors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />

            <div className="donor-list">
                <h2>Donor List</h2>
                {donors.length > 0 ? (
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Age</th>
                                <th>Gender</th>
                                <th>Blood Type</th>
                                <th>Address</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {donors.filter(d => d.name.toLowerCase().includes(searchQuery.toLowerCase())).map((donor) => (
                                <tr key={donor.donor_id}>
                                    <td>{donor.name}</td>
                                    <td>{donor.donor_age}</td>
                                    <td>{donor.gender}</td>
                                    <td>{donor.blood}</td>
                                    <td>{donor.address}</td>
                                    <td>{donor.mail}</td>
                                    <td>{donor.number}</td>
                                    <td>
                                        <button className="edit-btn" onClick={() => handleEdit(donor)}>Edit</button>
                                        <button className="delete-btn" onClick={() => handleDelete(donor.donor_id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No donors available</p>
                )}
            </div>

            {showForm && (
                <div className="donor-form-box">
                    <h2>{isEditing ? "Edit Donor" : "Add Donor"}</h2>
                    <form onSubmit={handleSubmit}>
                        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
                        <input type="number" name="donor_age" placeholder="Age" value={formData.donor_age} onChange={handleChange} required />
                        <select name="gender" value={formData.gender} onChange={handleChange} required>
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                        <input type="text" name="blood" placeholder="Blood Type" value={formData.blood} onChange={handleChange} required />
                        <textarea name="address" placeholder="Address" value={formData.address} onChange={handleChange} required />
                        <input type="email" name="mail" placeholder="Email" value={formData.mail} onChange={handleChange} required />
                        <input type="text" name="number" placeholder="Phone Number" value={formData.number} onChange={handleChange} required />
                        <button type="submit">{isEditing ? "Update" : "Submit"}</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Donor;
