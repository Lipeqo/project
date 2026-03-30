const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors()); // 👈 KLUCZOWE

app.get("/items", (req, res) => {
  res.json([
    { name: "Zadanie 1" },
    { name: "Zadanie 2" },
    { name: "Zadanie 3" }
  ]);
});

app.listen(5000, () => {
  console.log("API działa na porcie 5000");
});