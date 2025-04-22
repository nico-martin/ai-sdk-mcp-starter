/**
 * https://github.com/manimohans/verge-news-mcp
 *
 * git clone git@github.com:manimohans/verge-news-mcp.git
 * cd verge-news-mcp
 * npm install
 * npm run build
 */
import { experimental_createMCPClient as createMCPClient } from "ai";
import { Experimental_StdioMCPTransport as StdioMCPTransport } from "ai/mcp-stdio";
import path from "path";
import { fileURLToPath } from "url";

import "../setupEnv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const mcpPath = path.resolve(__dirname, "./verge-news-mcp/build/index.js");

const mcpTheVerge = await createMCPClient({
  transport: new StdioMCPTransport({
    command: "node",
    args: [mcpPath],
  }),
});

export default mcpTheVerge;
