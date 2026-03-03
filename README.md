# BlogBurst MCP Server

Official [Model Context Protocol](https://modelcontextprotocol.io) server for [BlogBurst](https://blogburst.ai) — your autonomous AI social media marketing agent.

Chat naturally to generate content, manage auto-pilot daily posting, track analytics, and publish to 9 platforms.

## Features

- **AI Marketing Agent** — Chat naturally to do anything: generate content, check analytics, manage auto-pilot, all in one conversation
- **Auto-Pilot** — Autonomous daily posting agent that generates, reviews, and publishes content on schedule
- **Blog Generation** — Generate complete blog posts from topics
- **Content Repurposing** — Turn URLs or text into platform-ready social media posts
- **Platform Content** — Generate optimized content for 9 platforms (Twitter, LinkedIn, Reddit, Bluesky, Threads, Telegram, Discord, TikTok, YouTube)
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
- "Turn on auto-pilot, 3 posts per day on Bluesky and Twitter"
- "How did my posts perform this week?"
- "Publish this to my Bluesky and Telegram"

## Available Tools

| Tool | Description |
|------|-------------|
| `agent_chat` | Chat with your AI marketing agent — handles everything through conversation |
| `generate_blog` | Generate a complete blog post from a topic |
| `repurpose_content` | Turn a URL or text into social media posts |
| `generate_platform_content` | Generate platform-specific content from a topic |
| `get_trending_topics` | Discover trending topics by niche and source |
| `brainstorm_titles` | AI-powered title brainstorming conversation |
| `publish_content` | Publish to connected platforms (Bluesky, Telegram, Discord) |
| `get_auto_pilot_status` | Check auto-pilot status and configuration |
| `configure_auto_pilot` | Enable/disable auto-pilot, set frequency and platforms |
| `run_auto_pilot_now` | Trigger auto-pilot to run immediately |
| `get_connected_platforms` | Check which platforms are connected |
| `get_usage` | Check API usage and limits |

## Supported Platforms

| Platform | Auto-Publish | Content Style |
|----------|:---:|---------------|
| Twitter/X | Copy-only | Threads with hooks (280 chars/tweet) |
| LinkedIn | Coming soon | Professional insights + hashtags |
| Bluesky | Yes | Short authentic posts (300 chars) |
| Telegram | Yes | Rich formatted broadcasts |
| Discord | Yes | Community-friendly announcements |
| Reddit | Copy-only | Discussion posts + subreddit suggestions |
| TikTok | Copy-only | Hook + script + caption + hashtags |
| YouTube | Copy-only | Title + description + script + tags |
| Threads | Coming soon | Conversational posts |

## Pricing

Free plan: 50 generations/month. See [blogburst.ai/pricing](https://blogburst.ai/pricing) for Pro plans.

## Links

- [BlogBurst Website](https://blogburst.ai)
- [API Documentation](https://api.blogburst.ai/docs)
- [Twitter/X](https://x.com/BlogBurstAI)

## License

MIT
