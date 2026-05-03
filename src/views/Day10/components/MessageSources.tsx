import React from 'react';
import { SourcesPanel, SourcesToggle, SourcesList, SourceItem, SourceLink, SourceMeta } from '../Day10.styles';
import type { ClientCitation } from '@/app/api/chat/rag-citations/route';

interface MessageSourcesProps {
  citations: ClientCitation[];
}

export const MessageSources: React.FC<MessageSourcesProps> = ({ citations }) => {
  const [open, setOpen] = React.useState(false);

  if (citations.length === 0) return null;

  return (
    <SourcesPanel>
      <SourcesToggle onClick={() => setOpen((v) => !v)} aria-expanded={open}>
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ transform: open ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s ease' }}
        >
          <path d="M9 18l6-6-6-6" />
        </svg>
        {citations.length} source{citations.length !== 1 ? 's' : ''}
      </SourcesToggle>

      {open && (
        <SourcesList aria-label="Retrieved PubMed sources">
          {citations.map((c, i) => (
            <SourceItem key={c.id}>
              <span style={{ color: 'var(--colors-textMuted)', marginRight: '4px' }}>[{i + 1}]</span>{' '}
              <SourceLink
                href={`https://pubmed.ncbi.nlm.nih.gov/${c.id}/`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {c.title}
              </SourceLink>
              <br />
              <SourceMeta>
                {c.authors} — {c.journal}, {c.year}
              </SourceMeta>
            </SourceItem>
          ))}
        </SourcesList>
      )}
    </SourcesPanel>
  );
};
