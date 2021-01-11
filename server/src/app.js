const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const axios = require("axios");
const CronJob = require("cron").CronJob;

require("dotenv").config();

const middlewares = require("./middlewares");
const api = require("./api");

const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "hello world",
  });
});

let errors = [];

const job = new CronJob(
  "*/30 * * * * *",
  async () => {
    await axios
      .get("https://dev.fractal-it.fr:8443/fake_health_test?dynamic=true")
      .then((result) => {
        if (errors.length === 0) {
          errors.push(result.data.status);
        } else if (errors.length === 1) {
          errors.push(result.data.status);
        } else if (errors.length === 2) {
          if (!errors.includes("ok")) {
            console.log("email envoyé");
            errors = [];
          } else {
            errors = [];
          }
        }
      });
  },
  null,
  true
);
job.start();

app.get("/url", async (req, res) => {
  const url = "https://dev.fractal-it.fr:8443/fake_health_test?dynamic=true";
  const response = {
    state: null,
    url,
    error: false,
  };

  await axios.get(url).then((result) => {
    response.state = result.data.status;
    response.url = url;
  });

  res.json(response);
});

app.use("/api/v1", api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
