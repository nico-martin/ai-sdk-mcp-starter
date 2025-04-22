import { experimental_createMCPClient as createMCPClient } from "ai";
import { Experimental_StdioMCPTransport as StdioMCPTransport } from "ai/mcp-stdio";
import path from "path";
import { fileURLToPath } from "url";

import "./setupEnv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const mcpPath = path.resolve(
  __dirname,
  "../node_modules/@modelcontextprotocol/server-brave-search/dist/index.js"
);
const mcpClient = await createMCPClient({
  transport: new StdioMCPTransport({
    command: "node",
    args: [mcpPath],
    env: {
      BRAVE_API_KEY: process.env.BRAVE_API_KEY || "",
    },
  }),
});

export default mcpClient;
