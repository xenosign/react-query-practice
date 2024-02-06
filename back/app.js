// @ts-check
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.get("/test", (req, res) => {
  const str = "통신 완료";
  return res.json(str);
});

app.get("/pages/:page/:limit", (req, res) => {
  console.log(req.params);
  const str = "통신 완료";
  return res.json(str);
});

app.listen(PORT, () => {
  console.log(`The express server is running at port: ${PORT}`);
});
