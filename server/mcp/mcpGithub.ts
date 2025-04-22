/**
 * https://github.com/github/github-mcp-server
 *
 * Requires and env GITHUB_PERSONAL_ACCESS_TOKEN
 * https://github.com/settings/tokens
 * Settings -> Developer Settings --> Personal access tokens
 */
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
