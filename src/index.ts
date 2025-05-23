import { Client } from "pg";
import express from "express";

const app = express();
app.use(express.json());

const pgClient = new Client({
    user: "admin",
    password: "admin123",
    host: "localhost",
    port: 5432,
    database: "students"
});

app.post('/users', async (req, res) => {
    const { id, name, email } = req.body;

    const schoolId = req.body.sId;

    const schoolName = req.body.sName;


    const unsafeQuery = `INSERT INTO users(id, name, email) VALUES($1, $2, $3) RETURNING id`;

    try {
        const result = await pgClient.query(unsafeQuery, [id, name, email]);
        const schoolDetails = await pgClient.query(`INSERT INTO school(id,user_id,name) VALUES($1, $2, $3) RETURNING id`, [schoolId, result.rows[0].id, schoolName]);
        res.status(200).json({ 
            message: "User inserted successfully", 
            result: result.rows[0].id, 
            schoolDetails: schoolDetails.rows[0].id 
        });
    } catch (error: any) {
        console.error("Database error:", error);
        res.status(500).json({ message: "Error inserting user", error: error.message });
    }
});

app.listen(3000, async () => {
    try {
        await pgClient.connect();
        console.log("Connected to PostgreSQL");
        console.log("Server running on port 3000");
    } catch (err) {
        console.error("Failed to connect:", err);
    }
});
