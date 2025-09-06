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

/**
 * Attemps to connect if DB connection fails
 */
async function connectToDatabaseWithRetry() {
  const maxRetries = 10;
  let attempts = 0;
  while (attempts < maxRetries) {
    try {
      await sequelize.authenticate();
      await sequelize.sync({ alter: true });
      console.log("Connection has been established successfully.");
      break;
    } catch (error) {
      attempts++;
      console.error(
        `Unable to connect to the database (Attempt ${attempts} of ${maxRetries}):`,
        error
      );
      if (attempts < maxRetries) {
        console.log("Retrying in 5 seconds...");
        await new Promise((res) => setTimeout(res, 5000));
      } else {
        console.error(
          "Max retries reached. Could not connect to the database."
        );
      }
    }
  }
}
await connectToDatabaseWithRetry();

routerApi(app);
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
