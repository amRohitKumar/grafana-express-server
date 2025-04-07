const express = require("express");
const promClient = require("prom-client");
const { heavyTask } = require("./utils.js");

const app = express();
const port = 8080;

const collectDefaultMetrics = promClient.collectDefaultMetrics;
const Registry = promClient.Registry;
const register = new Registry();
collectDefaultMetrics({ register });

app.get("/", (req, res) => {
  return res.json({ message: "Server is helathy!" });
});

app.get("/slow", async (req, res) => {
  try {
    await heavyTask(5000);
    return res.json({ message: "Task completed successfully!" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/metrics", async (req, res) => {
  try {
    const metrics = await register.metrics();
    res.set("Content-Type", register.contentType);
    res.send(metrics);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
}); 

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
