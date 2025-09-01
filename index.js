import express from 'express';
import dotenv from 'dotenv';
import sequelize from './config/database.js';
import cors from 'cors';



dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded());

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Backend funcionando ");
});
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});