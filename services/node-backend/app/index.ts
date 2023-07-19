import bodyParser from "body-parser";
import express from "express";
import cors from "cors";

import config from "./config";
const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
    credentials: false,
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (_, res) =>
  res.send(`Node and express server is running on port ${config.PORT}`)
);

app.listen(config.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`${config.APP_NAME} is running on port ${config.PORT}`);
});
