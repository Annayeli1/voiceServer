import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function preguntarGemini(texto) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: texto,
  });

  return response.text;
}

app.post("/mensaje", async (req, res) => {
  try {
    const { mensaje } = req.body;

    const respuesta = await preguntarGemini(mensaje);

    res.json({
      botText: respuesta,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

app.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});
