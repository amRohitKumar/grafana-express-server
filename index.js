const express = require("express");
const { heavyTask } = require("./utils.js");

const app = express();
const port = 8080;

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

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
