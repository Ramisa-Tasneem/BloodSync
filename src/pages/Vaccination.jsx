import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Vaccination.css";

const Vaccination = () => {
    const [vaccinations, setVaccinations] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("/api/vaccinations") // Replace with actual API endpoint
            .then((response) => response.json())
            .then((data) => setVaccinations(data))
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

    return (
        <div className="vaccination-container">
            <h2>Vaccination Records</h2>
            <table className="vaccination-table">
                <thead>
                    <tr>
                        <th>Vaccination ID</th>
                        <th>Donor ID</th>
                        <th>Vaccine Name</th>
                        <th>Dose Number</th>
                        <th>Vaccination Date</th>
                        <th>Expiry Date</th>
                        <th>Administered By</th>
                        <th>Hospital Name</th>
                    </tr>
                </thead>
                <tbody>
                    {vaccinations.map((vaccination) => (
                        <tr key={vaccination.vaccination_id}>
                            <td>{vaccination.vaccination_id}</td>
                            <td>{vaccination.donor_id}</td>
                            <td>{vaccination.vaccine_name}</td>
                            <td>{vaccination.dose_number}</td>
                            <td>{vaccination.vaccination_date}</td>
                            <td>{vaccination.expiry_date}</td>
                            <td>{vaccination.administered_by || "N/A"}</td>
                            <td>{vaccination.hospital_name || "N/A"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button className="back-button" onClick={() => navigate("/")}>Back to Home</button>
        </div>
    );
};

export default Vaccination;
