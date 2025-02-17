import express from "express";
import db from "../database.js";

const router = express.Router();


router.post("/add-bloodstock", (req, res) => {
    const { blood_group, volume, donated_date, expired_date } = req.body;

    if (!blood_group || !volume || !donated_date || !expired_date) {
        return res.status(400).json({ error: "All fields are required" });
    }

    const sql = "INSERT INTO BloodStock (blood_group, volume, donated_date, expired_date) VALUES (?, ?, ?, ?)";
    const values = [blood_group, volume, donated_date, expired_date];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("Database Insert Error:", err);  // Log error in the terminal
            return res.status(500).json({ error: "Database error", details: err.sqlMessage });
        }
        res.status(201).json({ message: "Blood stock added successfully" });
    });
});


router.get("/", (req, res) => {
    const sql = "SELECT * FROM BloodStock ORDER BY expired_date ASC";

    db.query(sql, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Database error" });
        }
        res.status(200).json(results);
    });
});

export default router;
