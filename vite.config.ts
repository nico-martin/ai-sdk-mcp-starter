import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { defineConfig } from "vite";
import htmlPlugin from "vite-plugin-html-config";

dotenv.config();

const TITLE = "AI SDK MCP Client Starter";

export default defineConfig({
  root: path.resolve(__dirname, "ui"),
  publicDir: path.resolve(__dirname, "ui/public"),
  server: {
    ...(fs.existsSync(process.env.SSL_KEY || "") &&
    fs.existsSync(process.env.SSL_CRT || "")
      ? {
          https: {
            key: fs.readFileSync(process.env.SSL_KEY || ""),
            cert: fs.readFileSync(process.env.SSL_CRT || ""),
          },
        }
      : {}),
    port: process.env.VITE_PORT ? parseInt(process.env.VITE_PORT) : 8080,
  },
  plugins: [
    react(),
    tailwindcss(),
    htmlPlugin({
      title: TITLE,
    }),
  ],
  build: {
    outDir: path.resolve(__dirname, "dist/ui"),
    emptyOutDir: true,
  },
});
