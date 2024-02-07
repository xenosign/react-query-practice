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
      id: 1,
      name: "Faker",
      position: "MID",
    },
    {
      id: 2,
      name: "Gumayusi",
      position: "AD",
    },
    {
      id: 3,
      name: "Keria",
      position: "SUPPORT",
    },
    {
      id: 4,
      name: "Oner",
      position: "JUNGLE",
    },
    {
      id: 5,
      name: "Zeus",
      position: "TOP",
    }
  ],
  kt: [
    {
      id: 1,
      name: "Deft",
      position: "AD",
    },
    {
      id: 2,
      name: "BDD",
      position: "MID",
    },
    {
      id: 3,
      name: "Pyosik",
      position: "JUNGLE",
    },
    {
      id: 4,
      name: "Beryl",
      position: "SUPPORT",
    },
    {
      id: 5,
      name: "Perfect",
      position: "TOP",
    }
  ]
}


app.get("/players", (req, res) => {
  const data = db[req.query.team ? req.query.team : 't1'];
  return res.json(data);
});

app.listen(PORT, () => {
  console.log(`The express server is running at port: ${PORT}`);
});
