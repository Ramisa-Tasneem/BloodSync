import express from "express";
import db from "../database.js";

const router = express.Router();

router.get('/allInventory', (req, res) => {
    // Query for total volume and donor count per blood group
    const sql1 = `
        SELECT 
            blood_group, 
            COUNT(DISTINCT donor) AS total_donors,  -- Count of unique donors per blood group
            SUM(volume) AS total_volume  -- Sum of blood volume per blood group
        FROM bloodstock 
        GROUP BY blood_group;
    `;

    // Query for overall total donors and blood volume
    const sql2 = `
        SELECT 
            COUNT(DISTINCT donor) AS total_donors,  -- Total unique donors
            SUM(volume) AS total_volume  -- Total volume of blood
        FROM bloodstock;
    `;

    // Execute both queries in sequence
    db.query(sql1, (err, bloodGroupData) => {
        if (err) {
            console.error("Database error in first query:", err);
            return res.status(500).json({ error: "Database error in first query", err });
        }

        db.query(sql2, (err, totalData) => {
            if (err) {
                console.error("Database error in second query:", err);
                return res.status(500).json({ error: "Database error in second query", err });
            }

            // Send both sets of data in the response
            res.status(200).json({
                blood_group_data: bloodGroupData,
                total_data: totalData[0]  // The result of the second query is an array, so we take the first element
            });
        });
    });
});















export default router;









