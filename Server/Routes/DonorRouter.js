import express from "express";
import db from "../database.js";

const router = express.Router();

router.post("/add-donor", (req, res) => {
    const { name, donor_age, gender, blood, address, mail, number } = req.body;
    if (!name || !donor_age || !gender || !blood || !address || !mail || !number) {
        return res.status(400).json({ error: "All fields are required" });
    }

    const sql = "INSERT INTO donor (name, donor_age, gender, blood, address, mail, number) VALUES (?, ?, ?, ?, ?, ?, ?)";
    const values = [name, donor_age, gender, blood, address, mail, number];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("Error inserting donor:", err);
            return res.status(500).json({ error: "Database error" });
        }
        res.status(201).json({ message: "Donor added successfully", donor_id: result.insertId });
    });
});


router.get("/", (req, res) => {
    const sql = "SELECT * FROM donor ORDER BY name ASC";
    db.query(sql, (err, results) => {
        if (err) {
            console.error("Error fetching donors:", err);
            return res.status(500).json({ error: "Database error" });
        }
        res.status(200).json(results);
    });
});


router.put("/update-donor/:id", (req, res) => {
    const { id } = req.params;
    const { name, donor_age, gender, blood, address, mail, number } = req.body;

    if (!name || !donor_age || !gender || !blood || !address || !mail || !number) {
        return res.status(400).json({ error: "All fields are required" });
    }

    const sql = "UPDATE donor SET name=?, donor_age=?, gender=?, blood=?, address=?, mail=?, number=? WHERE donor_id=?";
    const values = [name, donor_age, gender, blood, address, mail, number, id];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("Error updating donor:", err);
            return res.status(500).json({ error: "Database error" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Donor not found" });
        }
        res.status(200).json({ message: "Donor updated successfully" });
    });
});


router.delete("/delete-donor/:id", (req, res) => {
    const { id } = req.params;

    const sql = "DELETE FROM donor WHERE donor_id=?";

    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error("Error deleting donor:", err);
            return res.status(500).json({ error: "Database error" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Donor not found" });
        }
        res.status(200).json({ message: "Donor deleted successfully" });
    });
});

export default router;
