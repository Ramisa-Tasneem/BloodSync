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
            console.error(err);
            return res.status(500).json({ error: "Database error" });
        }
        res.status(201).json({ message: "Donor added successfully" });
    });
});

router.get("/", (req, res) => {
    const sql = "SELECT * FROM donor ORDER BY name ASC";
    db.query(sql, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Database error" });
        }
        res.status(200).json(results);
    });
});

export default router;
