import type { Tool } from "@modelcontextprotocol/sdk/types.js";
import { get, post } from "./api.js";

export const tools: Tool[] = [
  {
    name: "generate_blog",
    description:
      "Generate a complete AI-written blog post from a topic. Returns title, content (markdown), meta description, and tags.",
    inputSchema: {
      type: "object" as const,
      properties: {
        topic: {
          type: "string",
          description: "The blog topic or keywords",
        },
        tone: {
          type: "string",
          enum: [
            "professional",
            "casual",
            "witty",
            "educational",
            "inspirational",
          ],
          description: "Writing tone (default: professional)",
        },
        language: {
          type: "string",
          enum: ["en", "zh"],
          description: "Content language (default: en)",
        },
        length: {
          type: "string",
          enum: ["short", "medium", "long"],
          description: "Blog post length (default: medium)",
        },
      },
      required: ["topic"],
    },
  },
  {
    name: "repurpose_content",
    description:
      "Turn a blog URL or raw text into ready-to-post social media content for multiple platforms. Supports Twitter, LinkedIn, Reddit, Bluesky, Threads, Telegram, Discord, TikTok, YouTube.",
    inputSchema: {
      type: "object" as const,
      properties: {
        content: {
          type: "string",
          description: "A URL to a blog/article OR raw text to repurpose",
        },
        platforms: {
          type: "array",
          items: {
            type: "string",
            enum: [
              "twitter",
              "linkedin",
              "reddit",
              "bluesky",
              "threads",
              "telegram",
              "discord",
              "tiktok",
              "youtube",
            ],
          },
          description: "Target platforms for content generation",
        },
        tone: {
          type: "string",
          enum: [
            "professional",
            "casual",
            "witty",
            "educational",
            "inspirational",
          ],
          description: "Writing tone (default: professional)",
        },
        language: {
          type: "string",
          enum: ["en", "zh"],
          description: "Content language (default: en)",
        },
      },
      required: ["content", "platforms"],
    },
  },
  {
    name: "generate_platform_content",
    description:
      "Generate social media posts directly from a topic (no blog needed). Creates platform-optimized content with correct character limits.",
    inputSchema: {
      type: "object" as const,
      properties: {
        topic: {
          type: "string",
          description: "The topic to create content about",
        },
        platforms: {
          type: "array",
          items: {
            type: "string",
            enum: [
              "twitter",
              "linkedin",
              "reddit",
              "bluesky",
              "threads",
              "telegram",
              "discord",
              "tiktok",
              "youtube",
            ],
          },
          description: "Target platforms",
        },
        tone: {
          type: "string",
          enum: [
            "professional",
            "casual",
            "witty",
            "educational",
            "inspirational",
          ],
          description: "Writing tone (default: professional)",
        },
        language: {
          type: "string",
          enum: ["en", "zh"],
          description: "Content language (default: en)",
        },
      },
      required: ["topic", "platforms"],
    },
  },
  {
    name: "get_trending_topics",
    description:
      "Discover trending topics from HackerNews, Reddit, Google Trends, and Product Hunt. Great for finding content inspiration.",
    inputSchema: {
      type: "object" as const,
      properties: {
        niche: {
          type: "string",
          enum: [
            "marketing",
            "startup",
            "ecommerce",
            "tech",
            "ai",
            "creator",
          ],
          description: "Filter by niche/industry",
        },
        source: {
          type: "string",
          enum: ["hackernews", "reddit", "google_trends", "producthunt"],
          description: "Filter by source platform",
        },
        limit: {
          type: "number",
          description: "Number of topics to return (default: 20)",
        },
      },
    },
  },
  {
    name: "brainstorm_titles",
    description:
      "AI-powered title brainstorming via multi-turn conversation. Send messages to iteratively refine blog post titles.",
    inputSchema: {
      type: "object" as const,
      properties: {
        messages: {
          type: "array",
          items: {
            type: "object",
            properties: {
              role: {
                type: "string",
                enum: ["user", "assistant"],
              },
              content: {
                type: "string",
              },
            },
            required: ["role", "content"],
          },
          description:
            'Conversation messages for title brainstorming. Start with a user message describing your topic, e.g. [{"role": "user", "content": "I need titles about AI in marketing"}]',
        },
        language: {
          type: "string",
          enum: ["en", "zh"],
          description: "Language for generated titles (default: en)",
        },
      },
      required: ["messages"],
    },
  },
  {
    name: "publish_content",
    description:
      "Publish content directly to your connected social media platforms (Bluesky, Telegram, Discord). Requires platforms to be connected in your BlogBurst dashboard.",
    inputSchema: {
      type: "object" as const,
      properties: {
        platforms: {
          type: "array",
          items: {
            type: "string",
            enum: ["bluesky", "telegram", "discord"],
          },
          description: "Platforms to publish to (must be connected first)",
        },
        content: {
          type: "string",
          description: "The content to publish",
        },
        image_urls: {
          type: "array",
          items: { type: "string" },
          description: "Optional image URLs to attach",
        },
      },
      required: ["platforms", "content"],
    },
  },
  {
    name: "get_connected_platforms",
    description:
      "Check which social media platforms are connected to your BlogBurst account and ready for auto-publishing.",
    inputSchema: {
      type: "object" as const,
      properties: {},
    },
  },
  {
    name: "get_usage",
    description:
      "Check your current API usage, remaining generations, and plan limits.",
    inputSchema: {
      type: "object" as const,
      properties: {},
    },
  },
];

export async function handleToolCall(
  name: string,
  args: Record<string, unknown>
): Promise<{ content: Array<{ type: string; text: string }>; isError?: boolean }> {
  try {
    let result: unknown;

    switch (name) {
      case "generate_blog":
        result = await post("/blog/generate", {
          topic: args.topic,
          tone: args.tone || "professional",
          language: args.language || "en",
          length: args.length || "medium",
        });
        break;

      case "repurpose_content":
        result = await post("/repurpose", {
          content: args.content,
          platforms: args.platforms,
          tone: args.tone || "professional",
          language: args.language || "en",
        });
        break;

      case "generate_platform_content":
        result = await post("/blog/platforms", {
          topic: args.topic,
          platforms: args.platforms,
          tone: args.tone || "professional",
          language: args.language || "en",
        });
        break;

      case "get_trending_topics": {
        const params = new URLSearchParams();
        if (args.niche) params.set("niche", args.niche as string);
        if (args.source) params.set("source", args.source as string);
        if (args.limit) params.set("limit", String(args.limit));
        const query = params.toString();
        result = await get(`/assistant/trending-topics${query ? `?${query}` : ""}`);
        break;
      }

      case "brainstorm_titles":
        result = await post("/chat/title", {
          messages: args.messages,
          language: args.language || "en",
        });
        break;

      case "publish_content":
        result = await post("/publish", {
          platforms: args.platforms,
          content: args.content,
          image_urls: args.image_urls || [],
        });
        break;

      case "get_connected_platforms":
        result = await get("/publish/connected");
        break;

      case "get_usage":
        result = await get("/usage");
        break;

      default:
        return {
          content: [{ type: "text", text: `Unknown tool: ${name}` }],
          isError: true,
        };
    }

    return {
      content: [
        { type: "text", text: JSON.stringify(result, null, 2) },
      ],
    };
  } catch (error) {
    return {
      content: [
        {
          type: "text",
          text: `Error: ${error instanceof Error ? error.message : String(error)}`,
        },
      ],
      isError: true,
    };
  }
}
