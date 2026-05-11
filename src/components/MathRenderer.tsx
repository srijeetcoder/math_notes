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

  return (
    <span
      className={`${inline ? 'math-inline' : 'math-display'} ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};
