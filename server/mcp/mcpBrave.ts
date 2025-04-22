/**
 * https://github.com/modelcontextprotocol/servers/tree/main/src/brave-search
 *
 * Requires and env BRAVE_API_KEY
 * https://api-dashboard.search.brave.com/app/keys
 */
import { experimental_createMCPClient as createMCPClient } from "ai";
import { Experimental_StdioMCPTransport as StdioMCPTransport } from "ai/mcp-stdio";

import "../setupEnv";

const mcpBrave = await createMCPClient({
  transport: new StdioMCPTransport({
    command: "npx",
    args: ["@modelcontextprotocol/server-brave-search"],
    env: {
      BRAVE_API_KEY: process.env.BRAVE_API_KEY || "",
    },
  }),
});

export default mcpBrave;
