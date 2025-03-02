import express from "express";
import db from "../database.js";

const router = express.Router();
router.post("/add-request", (req, res) => {
    const { hospital_name, patient_name, contact_number, blood_group, requested_volume, request_date } = req.body;

    if (!hospital_name || !patient_name || !contact_number || !blood_group || !requested_volume || !request_date) {
        return res.status(400).json({ error: "All fields are required" });
    }

    const sql = `INSERT INTO BloodRequest 
                (hospital_name, patient_name, contact_number, blood_group, requested_volume, request_date) 
                VALUES (?, ?, ?, ?, ?, ?)`;
    const values = [hospital_name, patient_name, contact_number, blood_group, requested_volume, request_date];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("Error adding request:", err);
            return res.status(500).json({ error: "Database error" });
        }
        res.status(201).json({ message: "Blood request added successfully", request_id: result.insertId });
    });
});

router.get("/", (req, res) => {
    const sql = "SELECT * FROM BloodRequest ORDER BY request_date DESC";

    db.query(sql, (err, results) => {
        if (err) {
            console.error("Error fetching requests:", err);
            return res.status(500).json({ error: "Database error" });
        }
        res.status(200).json(results);
    });
});

router.get("/available-requests", (req, res) => {
    const sql = `
        SELECT 
            br.request_id, br.hospital_name, br.patient_name, br.blood_group, br.requested_volume, 
            bs.blood_id, bs.volume AS available_volume, bs.expired_date
        FROM BloodRequest br
        LEFT JOIN bloodstock bs ON br.blood_group = bs.blood_group
        WHERE bs.expired_date > CURDATE();
    `;

    db.query(sql, (err, results) => {
        if (err) {
            console.error("Error fetching available requests:", err);
            return res.status(500).json({ error: "Database error" });
        }
        res.status(200).json(results);
    });
});

router.get("/unfulfilled-requests", (req, res) => {
    const sql = `
        SELECT * FROM BloodRequest 
        WHERE blood_group NOT IN (SELECT DISTINCT blood_group FROM bloodstock);
    `;

    db.query(sql, (err, results) => {
        if (err) {
            console.error("Error fetching unfulfilled requests:", err);
            return res.status(500).json({ error: "Database error" });
        }
        res.status(200).json(results);
    });
});

router.put("/update-request/:id", (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    if (!["Pending", "Approved", "Completed", "Rejected"].includes(status)) {
        return res.status(400).json({ error: "Invalid status" });
    }

    const sql = "UPDATE BloodRequest SET status=? WHERE request_id=?";
    const values = [status, id];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("Error updating request:", err);
            return res.status(500).json({ error: "Database error" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Request not found" });
        }
        res.status(200).json({ message: "Request status updated successfully" });
    });
});

router.delete("/delete-request/:id", (req, res) => {
    const { id } = req.params;

    const sql = "DELETE FROM BloodRequest WHERE request_id=?";

    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error("Error deleting request:", err);
            return res.status(500).json({ error: "Database error" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Request not found" });
        }
        res.status(200).json({ message: "Blood request deleted successfully" });
    });
});

export default router;
