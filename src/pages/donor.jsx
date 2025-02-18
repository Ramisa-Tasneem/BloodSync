import React, { useState } from 'react';
import axios from 'axios';
import "../styles/donor.css";

const Donor = () => {
    const [formData, setFormData] = useState({
        name: '',
        donor_age: '',
        gender: '',
        blood: '',
        address: '',
        mail: '',
        number: ''
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();


        if (
            !formData.name ||
            !formData.donor_age ||
            !formData.gender ||
            !formData.blood ||
            !formData.address ||
            !formData.mail ||
            !formData.number
        ) {
            alert('Please fill in all fields');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8000/api/donors/add-donor', formData);
            alert('Donor added successfully!');
            setFormData({
                name: '',
                donor_age: '',
                gender: '',
                blood: '',
                address: '',
                mail: '',
                number: ''
            });
        } catch (error) {
            alert('Error adding donor. Please try again.');
        }
    };

    return (
        <div className="donor-form-container">
            <h2>Donor Information</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Age:</label>
                    <input
                        type="number"
                        name="donor_age"
                        value={formData.donor_age}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Gender:</label>
                    <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div>
                    <label>Blood Type:</label>
                    <input
                        type="text"
                        name="blood"
                        value={formData.blood}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Address:</label>
                    <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="mail"
                        value={formData.mail}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Phone Number:</label>
                    <input
                        type="text"
                        name="number"
                        value={formData.number}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default Donor;
