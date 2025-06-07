"use client";
import React, { useState, useEffect, createContext, useContext } from 'react';
import { Button } from '../../components/design-system/Button';
import { BottomSheet } from '../../components/design-system/BottomSheet';
import { TextInput } from '../../components/design-system/TextInput';
import { SelectInput } from '../../components/design-system/SelectInput';
import { Checkbox } from '../../components/design-system/Checkbox';
import { PageHeader } from '../../components/design-system/PageHeader';
import { fetchFigmaVariables } from '../../utils/figmaMcp';

/**
 * /builder page: AI UI Builder
 * - Preview generated UI
 * - Prompt textarea and Generate button
 * - Extend logic for AI integration
 */

// Context for Figma tokens and components
const FigmaContext = createContext<any>(null);
export function useFigma() {
  return useContext(FigmaContext);
}

const BuilderPage = () => {
  const [prompt, setPrompt] = useState('Cart page with 2 products and a checkout bar');
  const [generated, setGenerated] = useState<React.ReactNode>(null);
  const [error, setError] = useState<string | null>(null);
  const [tokens, setTokens] = useState<any>(null);
  const [components, setComponents] = useState<any>(null);

  // Fetch tokens/components on mount
  useEffect(() => {
    fetch('/api/figma-design-tokens').then(r => r.json()).then(setTokens);
    fetch('/api/figma-components').then(r => r.json()).then(setComponents);
  }, []);

  // Call the backend API to generate UI
  const handleGenerate = async () => {
    setError(null);
    setGenerated(null);
    try {
      const res = await fetch('/api/generate-ui', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      if (!res.ok || !data.jsx) {
        setError(data.error || 'Failed to generate UI.');
        return;
      }
      // Try to evaluate the returned JSX string
      try {
        // eslint-disable-next-line no-new-func
        const Comp = new Function('React', 'Button', 'BottomSheet', 'TextInput', 'SelectInput', 'Checkbox', 'PageHeader', `return (${data.jsx});`);
        setGenerated(
          Comp(
            React,
            Button,
            BottomSheet,
            TextInput,
            SelectInput,
            Checkbox,
            PageHeader
          )
        );
      } catch (e) {
        setError('Invalid component output.');
      }
    } catch (e) {
      setError('Failed to call API.');
    }
  };

  // Fetch Figma design tokens from MCP
  const handleSyncTokens = async () => {
    try {
      const res = await fetch('/api/figma-design-tokens');
      const data = await res.json();
      // For demo: show in alert (or use in your app as needed)
      alert('Fetched Figma tokens: ' + JSON.stringify(data, null, 2));
    } catch (e) {
      alert('Failed to fetch Figma tokens');
    }
  };

  // Fetch Figma component metadata from MCP
  const handleSyncComponents = async () => {
    try {
      const res = await fetch('/api/figma-components');
      const data = await res.json();
      alert('Fetched Figma components: ' + JSON.stringify(data, null, 2));
    } catch (e) {
      alert('Failed to fetch Figma components');
    }
  };

  return (
    <FigmaContext.Provider value={{ tokens, components }}>
      <div className="max-w-2xl mx-auto py-10 px-4">
        <PageHeader title="AI UI Builder" subtitle="Describe a UI and generate it live" />
        <div className="mb-6">
          <Button className="mb-4" variant="secondary" onClick={handleSyncTokens}>
            Sync Figma Design Tokens
          </Button>
          <Button className="mb-2" variant="secondary" onClick={handleSyncComponents}>
            Sync Figma Components
          </Button>
          <textarea
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none min-h-[60px]"
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
            placeholder="Describe the UI you want to generate..."
          />
          <Button className="mt-2" onClick={handleGenerate}>
            Generate
          </Button>
          {error && <div className="mt-2 text-red-500 text-sm">{error}</div>}
        </div>
        <div className="border rounded-lg p-4 min-h-[300px] bg-gray-50">
          {/* Live preview of generated UI */}
          {generated}
        </div>
        {/* Live preview of tokens/components */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-2">Figma Tokens</h2>
          <pre className="bg-gray-100 rounded p-2 text-xs overflow-x-auto max-h-40">{tokens ? JSON.stringify(tokens, null, 2) : 'Loading...'}</pre>
          <h2 className="text-lg font-semibold mt-4 mb-2">Figma Components</h2>
          <pre className="bg-gray-100 rounded p-2 text-xs overflow-x-auto max-h-40">{components ? JSON.stringify(components, null, 2) : 'Loading...'}</pre>
        </div>
      </div>
    </FigmaContext.Provider>
  );
};

export default BuilderPage; 