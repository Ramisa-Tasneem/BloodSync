import express from "express";
import db from "../database.js";

const router = express.Router();


router.post("/add-bloodstock", (req, res) => {
    const { donor,blood_group, volume, donated_date, expired_date } = req.body;

   


    if (!donor || !blood_group || !volume || !donated_date || !expired_date) {
        return res.status(400).json({ error: "All fields are required" });
    }


    const sql = "INSERT INTO BloodStock (donor,blood_group, volume, donated_date, expired_date) VALUES (?, ?, ?, ?, ?)";
    const values = [donor,blood_group, volume, donated_date, expired_date];

   

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("Database Insert Error:", err);  
            return res.status(500).json({ error: "Database error", details: err.sqlMessage });
        }
        res.status(201).json({ message: "Blood stock added successfully" });
    });
});

router.put("/update", (req, res) => {
    const { blood_id, donor, blood_group, volume, donated_date, expired_date } = req.body;

    if (!blood_id || !donor || !blood_group || !volume || !donated_date || !expired_date) {
        return res.status(400).json({ error: "All fields are required" });
    }

    const sql = "UPDATE BloodStock SET donor = ?, blood_group = ?, volume = ?, donated_date = ?, expired_date = ? WHERE blood_id = ?";
    const values = [donor, blood_group, volume, donated_date, expired_date, blood_id];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Database error" });
        }
        res.status(200).json({ message: "Record updated successfully" });
    });
});


router.get("/all", (req, res) => {
    const sql = "SELECT * FROM BloodStock ORDER BY expired_date ASC";

    db.query(sql, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Database error" });
        }
        res.status(200).json(results);
    });
});


router.delete("/bloodStock", (req, res) => {
    const { blood_id } = req.body;

    if (!blood_id) {
        return res.status(400).json({ error: "Missing blood_id" });
    }

    const sql = "DELETE FROM BloodStock WHERE blood_id = ?";


 

    db.query(sql, [blood_id], (err, results) => {  // ✅ Pass `blood_id` as an array

        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Database error" });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ message: "No record found with this ID" });
        }

        res.status(200).json({ message: "Record deleted successfully" });
    });
});

export default router;
