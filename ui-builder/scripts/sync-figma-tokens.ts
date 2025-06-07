// scripts/sync-figma-tokens.ts
// Run with: npx ts-node scripts/sync-figma-tokens.ts

import fs from 'fs';
import fetch from 'node-fetch';

const MCP_BASE_URL = process.env.FIGMA_MCP_URL || 'http://localhost:3303';
const OUTPUT_PATH = 'src/theme/figma-tokens.json';

async function fetchFigmaVariables() {
  const res = await fetch(`${MCP_BASE_URL}/api/variables`);
  if (!res.ok) throw new Error('Failed to fetch Figma variables from MCP');
  return res.json();
}

async function main() {
  try {
    const tokens = await fetchFigmaVariables();
    fs.mkdirSync('src/theme', { recursive: true });
    fs.writeFileSync(OUTPUT_PATH, JSON.stringify(tokens, null, 2));
    console.log(`Figma tokens written to ${OUTPUT_PATH}`);
  } catch (e) {
    console.error('Error syncing Figma tokens:', e);
    process.exit(1);
  }
}

main(); 