// https://github.com/github/github-mcp-server
import { experimental_createMCPClient as createMCPClient } from "ai";
import { Experimental_StdioMCPTransport as StdioMCPTransport } from "ai/mcp-stdio";

import "../setupEnv";

const mcpGithub = await createMCPClient({
  transport: new StdioMCPTransport({
    command: "npx",
    args: ["@modelcontextprotocol/server-github"],
    env: {
      GITHUB_PERSONAL_ACCESS_TOKEN:
        process.env.GITHUB_PERSONAL_ACCESS_TOKEN || "",
    },
  }),
});

export default mcpGithub;
