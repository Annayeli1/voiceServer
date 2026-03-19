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

const registros = [];

async function preguntarGemini(texto) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: texto,
    });

    return response.text;
  } catch (error) {
    if (error.status === 429 || error.mensaje?.includes("quota")) {
      console.log("⚠️ Límite de tokens alcanzado");

      return "Lo siento, ya se alcanzó el límite de uso de la API. Intenta más tarde";
    }
    console.error("Error en gemini:", error);
    throw error;
  }
}
const registrarExterno = async (data) => {
  try {
    await fetch("https://eoqxi76mm8igszd.m.pipedream.net", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.log("Error enviado a RequestBin:", error);
  }
};

app.post("/mensaje", async (req, res) => {
  try {
    const { mensaje } = req.body;

    let respuestaFinal = "";

    if (mensaje.toLowerCase().includes("chiste")) {
      const jokeRes = await fetch(
        "https://official-joke-api.appspot.com/random_joke",
      );
      const jokeData = await jokeRes.json();

      const chiste = `${jokeData.setup} ${jokeData.punchline}`;

      respuestaFinal = await preguntarGemini(
        `Cuenta este chiste en español ${chiste}`,
      );

      await registrarExterno({
        tipo: "chiste",
        mensaje,
        chiste,
        fecha: new Date(),
      });
    } else {
      respuestaFinal = await preguntarGemini(mensaje);

      await registrarExterno({
        tipo: "mensaje",
        mensaje,
        respuesta: respuestaFinal,
        fecha: new Date(),
      });
    }
    res.json({
      botText: respuestaFinal,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

app.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});
