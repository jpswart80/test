/**
 * Utility to fetch design tokens (variables) from the local Figma MCP server.
 * MCP server must be running locally (default: http://localhost:3303)
 * Extend for more endpoints as needed.
 */

const MCP_BASE_URL = process.env.NEXT_PUBLIC_FIGMA_MCP_URL || 'http://localhost:3303';

export async function fetchFigmaVariables(nodeId?: string) {
  const url = nodeId
    ? `${MCP_BASE_URL}/api/variables?nodeId=${encodeURIComponent(nodeId)}`
    : `${MCP_BASE_URL}/api/variables`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch Figma variables from MCP');
  return res.json();
}

export async function fetchFigmaComponents() {
  const url = `${MCP_BASE_URL}/api/components`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch Figma components from MCP');
  return res.json();
}

// Example usage:
// const variables = await fetchFigmaVariables(); 
 