import express from 'express'
import { databaseInit } from './database'

const app = express();
app.use(express.json());

databaseInit().then(() => {
    console.log("Database connected.");
}).catch(error => {
    console.error("Database connection failed:", error);
});

app.get('/', (req, res) => {
    res.send("Hello World!");
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
})