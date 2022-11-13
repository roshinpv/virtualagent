import express from "express";
import { config } from "dotenv";
import cors from "cors";

import Routes from "./routes";

config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.use("/api/agent", Routes);

app.listen(PORT, () => console.log(`🔥  server running on port ${PORT}`));