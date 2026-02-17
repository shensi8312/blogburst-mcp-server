const API_BASE = process.env.BLOGBURST_API_URL || "https://api.blogburst.ai";
const API_PREFIX = "/api/v1";

function getApiKey(): string {
  return process.env.BLOGBURST_API_KEY || "";
}

export async function apiRequest(
  method: string,
  path: string,
  body?: Record<string, unknown>
): Promise<unknown> {
  const url = `${API_BASE}${API_PREFIX}${path}`;
  const headers: Record<string, string> = {
    "X-API-Key": getApiKey(),
    "Content-Type": "application/json",
  };

  const response = await fetch(url, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API error ${response.status}: ${errorText}`);
  }

  return response.json();
}

export async function get(path: string): Promise<unknown> {
  return apiRequest("GET", path);
}

export async function post(
  path: string,
  body: Record<string, unknown>
): Promise<unknown> {
  return apiRequest("POST", path, body);
}
