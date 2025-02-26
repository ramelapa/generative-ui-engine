const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());

// Load UI configuration from JSON file
const loadUIConfig = () => {
  const data = fs.readFileSync("ui-config.json");
  return JSON.parse(data);
};

// API to fetch UI configuration dynamically
app.get("/api/ui-config", (req, res) => {
  const role = req.query.role || "Finance";
  const UI_CONFIG = loadUIConfig();
  res.json(UI_CONFIG[role] || { theme: "default", components: [] });
});

// Start the server
const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`✅ Generative UI Engine running on port ${PORT}`);
});
