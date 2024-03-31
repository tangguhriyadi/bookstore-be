import app from "./app";

const port = process.env.PORT || 4000;

import db from "./infrastructure/db";

async function testDBConnection(): Promise<void> {
    try {
        await db.query("SELECT 1");
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Error connecting to database:", error);
    }
}

async function startServer(): Promise<void> {
    await testDBConnection();
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}

startServer();
