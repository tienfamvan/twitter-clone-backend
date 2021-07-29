import express from "express";
import cors from "cors";
import logger from "morgan";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// for body-parser middleware
app.use(express.json());

// cors middleware
app.use(cors());

// morgan logger for dev
app.use(logger("dev"));

app.use((req, res) => res.status(404).json({ error: "Route not found" }));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
