// @ts-check
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

const db = {
  t1: [
    {
      name: "Faker",
      position: "MID",
    },
    {
      name: "Gumayusi",
      position: "AD",
    },
    {
      name: "Keria",
      position: "SUPPORT",
    },
    {
      name: "Oner",
      position: "JUNGLE",
    },
    {
      name: "Zeus",
      position: "TOP",
    },
  ],
  kt: [
    {
      name: "Deft",
      position: "AD",
    },
    {
      name: "BDD",
      position: "MID",
    },
    {
      name: "Pyosik",
      position: "JUNGLE",
    },
    {
      name: "Beryl",
      position: "SUPPORT",
    },
    {
      name: "Perfect",
      position: "TOP",
    },
  ],
};

app.get("/players", (req, res) => {
  const data = db[req.query.team ? req.query.team : "t1"];
  return res.json(data);
});

app.post("/add", (req, res) => {
  const team = req.query.teamName;
  db[team].push(req.body);
  return res.json("등록 성공");
});

app.listen(PORT, () => {
  console.log(`The express server is running at port: ${PORT}`);
});
