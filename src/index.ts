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


    const unsafeQuery = `INSERT INTO users(id, name, email) VALUES(${id}, '${name}', '${email}s')`;

    try {
        await pgClient.query(unsafeQuery);
        res.status(200).json({ message: "User inserted (UNSAFE)" });
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
