#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  ListToolsRequestSchema,
  CallToolRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { tools, handleToolCall } from "./tools.js";

function createServer() {
  const server = new Server(
    {
      name: "blogburst-mcp",
      version: "2.0.0",
    },
    {
      capabilities: {
        tools: {},
      },
    }
  );

  server.setRequestHandler(ListToolsRequestSchema, async () => {
    return { tools };
  });

  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    return handleToolCall(request.params.name, request.params.arguments ?? {});
  });

  return server;
}

// Smithery sandbox: export for capability scanning without real credentials
export function createSandboxServer() {
  return createServer();
}

async function main() {
  const apiKey = process.env.BLOGBURST_API_KEY;
  if (!apiKey) {
    console.error(
      "BLOGBURST_API_KEY is required. Setup (2 min):\n" +
      "1. Sign up free: https://blogburst.ai\n" +
      "2. Set up your product: Dashboard > Strategy\n" +
      "3. Connect platforms: Dashboard > Connections (Twitter is one-click OAuth)\n" +
      "4. Get API key: Dashboard > API Keys\n" +
      "5. Add to your MCP config: \"env\": { \"BLOGBURST_API_KEY\": \"your-key\" }"
    );
    process.exit(1);
  }

  const server = createServer();
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("BlogBurst MCP server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
