const express = require("express");
const multer = require("multer");

const app = express();
const upload = multer();
app.get("/mensaje", (req, res) => {
  res.send("Esta ruta solo acepta POST con audio 🎤");
});

app.post("/mensaje", upload.single("audio"), (req, res) => {
  console.log("Archivo recibido:");
  console.log(req.file);

  res.json({
    ok: true,
    mensaje: "Audio recibido correctamente",
  });
});

app.listen(3000, () => {
  console.log("Servidor corriendo en puerto 3000");
});
