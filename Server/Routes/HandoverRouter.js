import express from "express";
import db from "../database.js";
const router = express.Router();


router.post("/add-handover", (req, res) => {
    const { request_id, picked_up_by } = req.body;

    if (!request_id || !picked_up_by) {
        return res.status(400).json({ error: "All fields are required" });
    }

    const sql = `INSERT INTO handedover_request (request_id, picked_up_by) VALUES (?, ?)`;
    db.query(sql, [request_id, picked_up_by], (err, result) => {
        if (err) {
            console.error("Error adding handover request:", err);
            return res.status(500).json({ error: "Database error" });
        }
        res.status(201).json({ message: "Handover request added successfully", id: result.insertId });
    });
});


router.get("/", (req, res) => {
    const sql = `
        SELECT hr.id, hr.request_id, br.hospital_name, br.patient_name, br.blood_group, 
               hr.picked_up_by, hr.date_created
        FROM handedover_request hr
        JOIN BloodRequest br ON hr.request_id = br.request_id
        ORDER BY hr.date_created DESC;
    `;

    db.query(sql, (err, results) => {
        if (err) {
            console.error("Error fetching handover requests:", err);
            return res.status(500).json({ error: "Database error" });
        }
        res.status(200).json(results);
    });
});


router.get("/:request_id", (req, res) => {
    const { request_id } = req.params;
    const sql = `
        SELECT hr.id, hr.request_id, br.hospital_name, br.patient_name, br.blood_group, 
               hr.picked_up_by, hr.date_created
        FROM handedover_request hr
        JOIN BloodRequest br ON hr.request_id = br.request_id
        WHERE hr.request_id = ?;
    `;

    db.query(sql, [request_id], (err, results) => {
        if (err) {
            console.error("Error fetching handover request:", err);
            return res.status(500).json({ error: "Database error" });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: "Handover request not found" });
        }
        res.status(200).json(results[0]);
    });
});


router.put("/update-handover/:id", (req, res) => {
    const { id } = req.params;
    const { picked_up_by } = req.body;

    if (!picked_up_by) {
        return res.status(400).json({ error: "Picked up by field is required" });
    }

    const sql = "UPDATE handedover_request SET picked_up_by=? WHERE id=?";
    db.query(sql, [picked_up_by, id], (err, result) => {
        if (err) {
            console.error("Error updating handover request:", err);
            return res.status(500).json({ error: "Database error" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Handover request not found" });
        }
        res.status(200).json({ message: "Handover request updated successfully" });
    });
});


router.delete("/delete-handover/:id", (req, res) => {
    const { id } = req.params;

    const sql = "DELETE FROM handedover_request WHERE id=?";
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error("Error deleting handover request:", err);
            return res.status(500).json({ error: "Database error" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Handover request not found" });
        }
        res.status(200).json({ message: "Handover request deleted successfully" });
    });
});

export default router;
