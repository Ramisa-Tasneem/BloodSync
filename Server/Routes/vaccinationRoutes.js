import express from "express";
import db from "../database.js";

const router = express.Router();
router.post("/add", (req, res) => {
    const { donor_id, vaccine_name, dose_number, vaccination_date, expiry_date, administered_by, hospital_name } = req.body;

    if (!donor_id || !vaccine_name || !dose_number || !vaccination_date || !expiry_date) {
        return res.status(400).json({ error: "All required fields must be provided" });
    }

    const sql = `
        INSERT INTO Vaccination 
        (donor_id, vaccine_name, dose_number, vaccination_date, expiry_date, administered_by, hospital_name) 
        VALUES (?, ?, ?, ?, ?, ?, ?)`;
    const values = [donor_id, vaccine_name, dose_number, vaccination_date, expiry_date, administered_by, hospital_name];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("Error adding vaccination:", err);
            return res.status(500).json({ error: "Database error" });
        }
        res.status(201).json({ message: "Vaccination record added successfully", vaccination_id: result.insertId });
    });
});

router.get("/", (req, res) => {
    const sql = "SELECT * FROM Vaccination ORDER BY vaccination_date DESC";

    db.query(sql, (err, results) => {
        if (err) {
            console.error("Error fetching vaccination records:", err);
            return res.status(500).json({ error: "Database error" });
        }
        res.status(200).json(results);
    });
});
router.get("/donor-vaccinations", (req, res) => {
    const sql = `
        SELECT 
            d.donor_id, d.name, d.blood, v.vaccine_name, v.dose_number, v.vaccination_date, v.expiry_date
        FROM donor d
        LEFT JOIN Vaccination v ON d.donor_id = v.donor_id
        ORDER BY d.name;
    `;

    db.query(sql, (err, results) => {
        if (err) {
            console.error("Error fetching donor vaccinations:", err);
            return res.status(500).json({ error: "Database error" });
        }
        res.status(200).json(results);
    });
});

router.get("/completed-vaccinations", (req, res) => {
    const sql = `
        SELECT * FROM donor 
        WHERE donor_id IN (SELECT donor_id FROM Vaccination WHERE dose_number >= 2);
    `;

    db.query(sql, (err, results) => {
        if (err) {
            console.error("Error fetching completed vaccinations:", err);
            return res.status(500).json({ error: "Database error" });
        }
        res.status(200).json(results);
    });
});

router.get("/non-vaccinated-donors", (req, res) => {
    const sql = `
        SELECT * FROM donor 
        WHERE donor_id NOT IN (SELECT DISTINCT donor_id FROM Vaccination);
    `;

    db.query(sql, (err, results) => {
        if (err) {
            console.error("Error fetching non-vaccinated donors:", err);
            return res.status(500).json({ error: "Database error" });
        }
        res.status(200).json(results);
    });
});
router.put("/update/:id", (req, res) => {
    const { id } = req.params;
    const { vaccine_name, dose_number, vaccination_date, expiry_date, administered_by, hospital_name } = req.body;

    const sql = `
        UPDATE Vaccination 
        SET vaccine_name=?, dose_number=?, vaccination_date=?, expiry_date=?, administered_by=?, hospital_name=? 
        WHERE vaccination_id=?`;

    const values = [vaccine_name, dose_number, vaccination_date, expiry_date, administered_by, hospital_name, id];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("Error updating vaccination record:", err);
            return res.status(500).json({ error: "Database error" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Vaccination record not found" });
        }
        res.status(200).json({ message: "Vaccination record updated successfully" });
    });
});

router.delete("/delete/:id", (req, res) => {
    const { id } = req.params;

    const sql = "DELETE FROM Vaccination WHERE vaccination_id=?";

    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error("Error deleting vaccination record:", err);
            return res.status(500).json({ error: "Database error" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Vaccination record not found" });
        }
        res.status(200).json({ message: "Vaccination record deleted successfully" });
    });
});

export default router;
