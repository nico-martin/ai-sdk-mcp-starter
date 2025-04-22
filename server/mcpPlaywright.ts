import { experimental_createMCPClient as createMCPClient } from "ai";
import { Experimental_StdioMCPTransport as StdioMCPTransport } from "ai/mcp-stdio";
import path from "path";
import { fileURLToPath } from "url";

import "./setupEnv";

const mcpClient = await createMCPClient({
  transport: new StdioMCPTransport({
    command: "npx",
    args: ["@modelcontextprotocol/server-puppeteer"],
  }),
});

export default mcpClient;
