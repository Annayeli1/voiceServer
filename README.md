Chat de Voz con Gemini + Node.js + Vue

Este proyecto es una aplicación tipo chat estilo chatgpt que permite:

- Capturar voz desde el navegador
- Enviar el texto a Gemini (IA)
- Recibir respuesta
- Reproducir respuesta y ponerla como texto

---

Tecnologías utilizadas

Backend

- Node.js
- Express
- Gemini API (`@google/genai`)
- CORS
- dotenv

Frontend

- Vue 3
- Web Speech API (reconocimiento de voz)
- SpeechSynthesis (texto a voz)

---

Instalación

\*Clonar el repositorio para Frontend:

Git:

```bash
git clone https://github.com/Annayeli1/pruebaVoiceBot.git
cd pruebaVoiceBot
```

---

\*Clonar el repositorio para Backend:

```bash
git clone https://github.com/Annayeli1/voiceServer.git
cd voiceServer
```

---

Configuración del Backend

Instalar dependencias:

```bash
npm install express cors dotenv @google/genai
```

Crear archivo .env

En la raíz del proyecto:

```env
GEMINI_API_KEY=tu_api_key_aqui
```

---

Comando para ejecutar el servidor

```bash
node server.js
```

Deberías ver:

```bash
Servidor corriendo en http://localhost:3000
```

---

Configuración en el frontend

Asegúrate de que tu frontend (Vue) esté corriendo, por ejemplo:

```bash
npm run dev
```

---

Flujo de la aplicación:

1. Usuario presiona 🎙️ "Iniciar"
2. Se activa el reconocimiento de voz
3. Se convierte voz → texto
4. Se envía a:

```
POST http://localhost:3000/mensaje
```

5. El backend:
   - Procesa el texto
   - Llama a Gemini
   - Devuelve respuesta

6. El frontend:
   - Muestra el mensaje
   - Muestra respuesta generada por Gemini

EndPoint disponible:

POST/mensaje

Request:

```json
{
  "mensaje": "Hola, cuéntame un chiste"
}
```

Responde:

```json
{
  "botText": "Aquí tienes un chiste..."
}
```

---

Manejo de errores

Si se alcanza el límite de la API (error 429):

```bash
Lo siento, ya se alcanzó el límite de uso de la API. Intenta más tarde
```

---

End point externo

El servidor envía logs a:

https://eoqxi76mm8igszd.m.pipedream.net

Esto sirve para monitorear requests (tipo RequestBin).

---

Si no funciona el micrófono

- Usa Chrome
- Acepta permisos de micrófono

---

- Asegúrate de tener:

```js
app.use(cors());
```
