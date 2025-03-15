import dotenv from "dotenv";
dotenv.config();

import express from "express";

import { PORT } from "./config/constants.js";

import expressInit from "./config/expressInit.js";
import mongooseInit from "./config/mongooseInit.js";

import routes from "./routes.js";

const app = express();

mongooseInit();
expressInit(app);

app.use("/api", routes);

app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);
