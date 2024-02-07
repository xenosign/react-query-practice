// @ts-check
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

const db = {
  member: [
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
      position: "Support",
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
  ]
}

app.get("/test", (req, res) => {
  const str = "통신 완료";
  return res.json(str);
});

app.get("/player", (req, res) => {
  return res.json(db);
});

app.listen(PORT, () => {
  console.log(`The express server is running at port: ${PORT}`);
});
