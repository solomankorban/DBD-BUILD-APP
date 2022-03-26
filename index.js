const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const path = require("path");
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")))
}

//routes//

//create build
app.post("/api/builds", async (req, res) => {
  try {
    const {
      description,
      role,
      character,
      perk1,
      perk2,
      perk3,
      perk4,
      item,
      addon1,
      addon2,
      offering,
    } = req.body.data;
    const newBuild = await pool.query(
      "INSERT INTO builds (description, role, character, perk1, perk2, perk3, perk4, item, addon1, addon2, offering) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *",
      [
        description,
        role,
        character,
        perk1,
        perk2,
        perk3,
        perk4,
        item,
        addon1,
        addon2,
        offering,
      ]
    );
    res.json(newBuild.rows[0]);
  } catch (e) {
    console.error(e.message);
  }
});

//get builds
app.get("/api/builds", async (req, res) => {
  try {
    const builds = await pool.query("SELECT * FROM builds");
    res.json(builds.rows);
  } catch (e) {
    console.error(e.message);
  }
});

//get build
app.get("/api/builds/:id", async (req, res) => {
  try {
    const build = await pool.query("SELECT * FROM builds WHERE build_id = $1", [
      req.params.id,
    ]);
    res.json(build.rows[0]);
  } catch (e) {
    console.error(e.message);
  }
});

//like build
app.post("/api/like/:id", async (req, res) => {
  try {
    const build = await pool.query(
      "UPDATE builds SET likes = likes + 1 WHERE build_id = $1",
      [req.params.id]
    );
    res.json(build.rows[0]);
  } catch (e) {
    console.error(e.message);
  }
});

//
app.get("/:id", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build/index.html"));
});

app.listen(port, () => {
  console.log("server started on port " + port);
});
