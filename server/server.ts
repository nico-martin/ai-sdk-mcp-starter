import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateText } from "ai";
import cors from "cors";
import express from "express";

import mcpClient from "./mcp/mcpGithub";
import "./setupEnv";

const API_KEY = process.env.GOOGLE_GENERATIVE_AI_API_KEY;

const google = createGoogleGenerativeAI({
  apiKey: API_KEY,
});

const app = express();
const PORT = process.env.VITE_BACKEND_PORT || 3000;
app.use(cors());
app.use(express.json());

app.post("/prompt", async (req, res) => {
  const { prompt } = req.body;

  if (typeof prompt !== "string") {
    return res
      .status(400)
      .json({ error: "Invalid input: prompt must be a string." });
  }

  const result = await generateText({
    system: "You are a helpful AI assistant.",
    model: google("models/gemini-2.0-flash-exp"),
    prompt,
    tools: await mcpClient.tools(),
    maxSteps: 5,
  });

  res.json({ receivedPrompt: prompt, answer: result.text });
});

app.get("/", (req, res) => res.json({ running: true }));

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
