const express = require("express");

const app = express();
const PORT = 3000;

app.get("/messages", (req, res) => {
  res.json([]); // devuelve array vacío
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
