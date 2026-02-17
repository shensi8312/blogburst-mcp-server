# BlogBurst MCP Server

Official [Model Context Protocol](https://modelcontextprotocol.io) server for [BlogBurst](https://blogburst.ai) — AI-powered content generation, repurposing, and multi-platform publishing.

## Features

- **Blog Generation** — Generate complete blog posts from topics
- **Content Repurposing** — Turn URLs or text into platform-ready social media posts
- **Platform Content** — Generate optimized content for 9+ platforms (Twitter, LinkedIn, Reddit, Bluesky, Threads, Telegram, Discord, TikTok, YouTube)
- **Trending Topics** — Discover what's hot on HackerNews, Reddit, Google Trends, Product Hunt
- **Title Brainstorming** — AI-powered multi-turn title ideation
- **Auto-Publishing** — Publish directly to connected platforms (Bluesky, Telegram, Discord)

## Quick Start

### 1. Get your API key

Sign up at [blogburst.ai](https://blogburst.ai) and get your free API key from [Dashboard > API Keys](https://blogburst.ai/dashboard/api-keys).

### 2. Configure in Claude Desktop

Add to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "blogburst": {
      "command": "npx",
      "args": ["-y", "blogburst-mcp-server"],
      "env": {
        "BLOGBURST_API_KEY": "your-api-key-here"
      }
    }
  }
}
```

### 3. Use it

Ask Claude:
- "Write a blog post about remote work productivity"
- "Turn this article into Twitter and LinkedIn posts: https://example.com/article"
- "What's trending in AI right now?"
- "Brainstorm some title ideas for a post about SaaS growth"
- "Publish this to my Bluesky and Telegram"

## Available Tools

| Tool | Description |
|------|-------------|
| `generate_blog` | Generate a complete blog post from a topic |
| `repurpose_content` | Turn a URL or text into social media posts |
| `generate_platform_content` | Generate platform-specific content from a topic |
| `get_trending_topics` | Discover trending topics by niche and source |
| `brainstorm_titles` | AI-powered title brainstorming conversation |
| `publish_content` | Publish to connected platforms (Bluesky, Telegram, Discord) |
| `get_connected_platforms` | Check which platforms are connected |
| `get_usage` | Check API usage and limits |

## Supported Platforms

Twitter, LinkedIn, Reddit, Bluesky, Threads, Telegram, Discord, TikTok, YouTube

## Pricing

Free plan: 50 generations/month. See [blogburst.ai/pricing](https://blogburst.ai/pricing) for Pro plans.

## Links

- [BlogBurst Website](https://blogburst.ai)
- [API Documentation](https://api.blogburst.ai/docs)
- [Twitter/X](https://x.com/BlogBurstAI)

## License

MIT
