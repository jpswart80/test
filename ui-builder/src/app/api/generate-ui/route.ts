import { NextRequest, NextResponse } from 'next/server';
import { OpenAI } from 'openai';

// TODO: Set your OpenAI API key in the environment
const OPENAI_API_KEY = process.env.OPENAI_API_KEY || '';

const SYSTEM_PROMPT = `You are an expert React UI generator. Given a prompt, return a single React component using ONLY these imports:
import { Button } from '../../components/design-system/Button';
import { BottomSheet } from '../../components/design-system/BottomSheet';
import { TextInput } from '../../components/design-system/TextInput';
import { SelectInput } from '../../components/design-system/SelectInput';
import { Checkbox } from '../../components/design-system/Checkbox';
import { PageHeader } from '../../components/design-system/PageHeader';

Do not use any other components or HTML elements except for layout (div, span, etc). Return only the JSX for the component, no explanations.`;

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();
    if (!prompt) {
      return NextResponse.json({ error: 'Missing prompt' }, { status: 400 });
    }

    if (!OPENAI_API_KEY) {
      // Fallback: return a static example if no API key is set
      const jsx = `(
        <div className=\"space-y-4\">
          <PageHeader title=\"Cart\" subtitle=\"2 products\" />
          <div className=\"flex flex-col gap-4\">
            <div className=\"flex items-center gap-4\">
              <img src=\"https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=facearea&w=80&h=80&q=80\" alt=\"Product\" className=\"w-20 h-20 rounded-lg object-cover\" />
              <div>
                <div className=\"font-medium\">Wireless Headphones</div>
                <div className=\"text-gray-500\">$99.99</div>
              </div>
              <Checkbox label=\"Select\" />
            </div>
            <div className=\"flex items-center gap-4\">
              <img src=\"https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=facearea&w=80&h=80&q=80\" alt=\"Product\" className=\"w-20 h-20 rounded-lg object-cover\" />
              <div>
                <div className=\"font-medium\">Smart Watch</div>
                <div className=\"text-gray-500\">$149.99</div>
              </div>
              <Checkbox label=\"Select\" />
            </div>
          </div>
          <BottomSheet open={true} onClose={() => {}}>
            <div className=\"flex items-center justify-between\">
              <div className=\"font-semibold\">Total: $249.98</div>
              <Button>Checkout</Button>
            </div>
          </BottomSheet>
        </div>
      )`;
      return NextResponse.json({ jsx });
    }

    // Call OpenAI API
    const openai = new OpenAI({ apiKey: OPENAI_API_KEY });
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: prompt },
      ],
      response_format: { type: 'text' },
      max_tokens: 800,
      temperature: 0.2,
    });
    // Extract JSX from the response
    const jsx = completion.choices[0]?.message?.content?.trim();
    if (!jsx) {
      return NextResponse.json({ error: 'No JSX returned from OpenAI.' }, { status: 500 });
    }
    return NextResponse.json({ jsx });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 