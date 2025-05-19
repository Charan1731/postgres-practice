import { Client } from "pg";

const pgClient = new Client("postgresql://admin:admin123@localhost:5432/testdb");

async function main() {
    await pgClient.connect();
    const res = await pgClient.query(`INSERT INTO users (username, email, password)
VALUES ('username_here', 'user@example.com', 'user_password');`)
    console.log(res.rows);
    console.log("Connected to PostgreSQL");
}

main();
