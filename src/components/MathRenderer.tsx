import React, { useMemo } from 'react';
import katex from 'katex';

interface MathRendererProps {
  math: string;
  inline?: boolean;
  className?: string;
}

export const MathRenderer: React.FC<MathRendererProps> = ({ math, inline = false, className = '' }) => {
  const html = useMemo(() => {
    try {
      return katex.renderToString(math, {
        displayMode: !inline,
        throwOnError: false,
        strict: false,
      });
    } catch (e) {
      console.error("KaTeX error:", e);
      return math;
    }
  }, [math, inline]);

  const Tag = inline ? 'span' : 'div';

  return (
    <Tag
      className={`${inline ? 'math-inline' : 'math-display'} ${className} ${!inline ? 'w-full overflow-x-auto overflow-y-hidden' : ''}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export const TextWithMath: React.FC<{ text: string }> = ({ text }) => {
  if (!text) return null;

  // Split by $$ ... $$ first, then $ ... $
  const blockRegex = /\$\$(.*?)\$\$/gs;
  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = blockRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push({ text: text.substring(lastIndex, match.index), display: false, isMath: false });
    }
    parts.push({ text: match[1], display: true, isMath: true });
    lastIndex = blockRegex.lastIndex;
  }
  if (lastIndex < text.length) {
    parts.push({ text: text.substring(lastIndex), display: false, isMath: false });
  }

  // Now process inline $ ... $ for non-math parts
  const finalParts: { text: string; display: boolean; isMath: boolean }[] = [];
  const inlineRegex = /\$(.*?)\$/g;

  parts.forEach(p => {
    if (p.isMath) {
      finalParts.push(p);
    } else {
      let inlineLastIndex = 0;
      let inlineMatch;
      while ((inlineMatch = inlineRegex.exec(p.text)) !== null) {
        if (inlineMatch.index > inlineLastIndex) {
          finalParts.push({ text: p.text.substring(inlineLastIndex, inlineMatch.index), display: false, isMath: false });
        }
        finalParts.push({ text: inlineMatch[1], display: false, isMath: true });
        inlineLastIndex = inlineRegex.lastIndex;
      }
      if (inlineLastIndex < p.text.length) {
        finalParts.push({ text: p.text.substring(inlineLastIndex), display: false, isMath: false });
      }
    }
  });

  return (
    <span className="text-with-math whitespace-pre-wrap">
      {finalParts.map((part, i) => 
        part.isMath ? (
          <MathRenderer key={i} math={part.text} inline={!part.display} />
        ) : (
          <span key={i}>{part.text}</span>
        )
      )}
    </span>
  );
};
