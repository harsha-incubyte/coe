import { NextResponse } from 'next/server';
import { retrieveContext } from '@/lib/rag';
import type { ClientCitation } from '@/lib/rag';

export type { ClientCitation };

export async function POST(req: Request) {
  try {
    const { query, systemPrompt } = await req.json();

    if (!query || !systemPrompt || query.trim().split(/\s+/).length < 4) {
      return NextResponse.json({ citations: [] });
    }

    const ragContext = await retrieveContext(query);
    const citations: ClientCitation[] = ragContext.results.map((r) => ({
      id: r.document.id,
      title: r.document.title,
      authors: r.document.authors,
      journal: r.document.journal,
      year: r.document.year,
    }));

    return NextResponse.json({ citations });
  } catch {
    return NextResponse.json({ citations: [] });
  }
}
