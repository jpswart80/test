import { NextRequest, NextResponse } from 'next/server';
import { fetchFigmaComponents } from '../../../utils/figmaMcp';

// API route to fetch Figma component metadata from MCP
export async function GET(req: NextRequest) {
  try {
    const components = await fetchFigmaComponents();
    return NextResponse.json(components);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch Figma components' }, { status: 500 });
  }
} 