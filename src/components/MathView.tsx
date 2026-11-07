import React, { useMemo } from 'react';
import katex from 'katex';

interface MathViewProps {
  math?: string;
  block?: boolean;
  className?: string;
  children?: React.ReactNode;
}

/**
 * High-performance, crash-proof KaTeX math renderer.
 * Stark monochrome styling with crisp typography.
 */
export const MathView: React.FC<MathViewProps> = ({
  math,
  block = false,
  className = '',
  children,
}) => {
  const content = (math ?? (typeof children === 'string' ? children : '')).trim();

  const renderedHtml = useMemo(() => {
    if (!content) return '';
    try {
      return katex.renderToString(content, {
        displayMode: block,
        throwOnError: false,
        strict: false,
        trust: true,
      });
    } catch (err) {
      console.warn('KaTeX render error:', err);
      return `<span class="text-rose-400 font-mono text-xs">${content}</span>`;
    }
  }, [content, block]);

  if (block) {
    return (
      <div
        className={`my-2 overflow-x-auto py-1 text-zinc-100 font-medium ${className}`}
        dangerouslySetInnerHTML={{ __html: renderedHtml }}
      />
    );
  }

  return (
    <span
      className={`inline-block px-0.5 text-zinc-100 ${className}`}
      dangerouslySetInnerHTML={{ __html: renderedHtml }}
    />
  );
};

/**
 * Text renderer that automatically detects and renders LaTeX delimiters:
 * - $$math$$ or \[math\] -> Block math
 * - $math$ or \(math\) -> Inline math
 * - Normal Thai & alphanumeric text rendered seamlessly
 */
export const FormattedMathText: React.FC<{
  text: string;
  className?: string;
}> = ({ text, className = '' }) => {
  const parts = useMemo(() => {
    if (!text) return [];

    const regex = /(\$\$[\s\S]*?\$\$|\\\[[\s\S]*?\\\]|\$[^\$\n]+?\$|\\\([\s\S]*?\\\))/g;
    const tokens: Array<{ type: 'text' | 'inline-math' | 'block-math'; content: string }> = [];
    let lastIdx = 0;
    let match: RegExpExecArray | null;

    while ((match = regex.exec(text)) !== null) {
      const matchIdx = match.index;
      if (matchIdx > lastIdx) {
        tokens.push({
          type: 'text',
          content: text.substring(lastIdx, matchIdx),
        });
      }

      const raw = match[0];
      if (raw.startsWith('$$') && raw.endsWith('$$')) {
        tokens.push({
          type: 'block-math',
          content: raw.slice(2, -2).trim(),
        });
      } else if (raw.startsWith('\\[') && raw.endsWith('\\]')) {
        tokens.push({
          type: 'block-math',
          content: raw.slice(2, -2).trim(),
        });
      } else if (raw.startsWith('$') && raw.endsWith('$')) {
        tokens.push({
          type: 'inline-math',
          content: raw.slice(1, -1).trim(),
        });
      } else if (raw.startsWith('\\(') && raw.endsWith('\\)')) {
        tokens.push({
          type: 'inline-math',
          content: raw.slice(2, -2).trim(),
        });
      }

      lastIdx = regex.lastIndex;
    }

    if (lastIdx < text.length) {
      tokens.push({
        type: 'text',
        content: text.substring(lastIdx),
      });
    }

    return tokens;
  }, [text]);

  return (
    <div className={`space-y-1.5 ${className}`}>
      {parts.map((p, i) => {
        if (p.type === 'block-math') {
          return <MathView key={i} math={p.content} block />;
        }
        if (p.type === 'inline-math') {
          return <MathView key={i} math={p.content} block={false} />;
        }
        return (
          <span key={i} className="whitespace-pre-wrap leading-relaxed text-zinc-300">
            {p.content}
          </span>
        );
      })}
    </div>
  );
};
