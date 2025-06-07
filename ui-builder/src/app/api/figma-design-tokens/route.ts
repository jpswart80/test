import { NextRequest, NextResponse } from 'next/server';
import { fetchFigmaVariables } from '../../../utils/figmaMcp';

// API route to fetch Figma design tokens (variables) from MCP
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const nodeId = searchParams.get('nodeId') || undefined;
    const tokens = await fetchFigmaVariables(nodeId);
    return NextResponse.json(tokens);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch Figma tokens' }, { status: 500 });
  }
} 