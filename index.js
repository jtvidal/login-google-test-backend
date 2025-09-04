import express from "express";
import dotenv from "dotenv";
import sequelize from "./config/database.js";
import cors from "cors";
import routerApi from "./routes/routes.js";
import "./models/user.model.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const PORT = process.env.PORT || 3001;

app.get("/", (req, res) => {
  res.send("Backend funcionando ");
});

await sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Database & tables created!");
  })
  .catch((err) => {
    console.error("Error creating database:", err);
  });

routerApi(app);
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
