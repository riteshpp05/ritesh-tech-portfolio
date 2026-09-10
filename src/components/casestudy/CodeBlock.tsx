import { useState } from 'react';

interface Props {
  language: string;
  label: string;
  code: string;
  explanation: string;
}

const CodeBlock = ({ language, label, code, explanation }: Props) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
    }
  };

  return (
    <div className="case-study-code-block">
      <div className="case-study-code-header">
        <div>
          <span>{language}</span>
          {label && <span className="case-study-code-label"> — {label}</span>}
        </div>
        <button
          onClick={handleCopy}
          style={{
            background: 'none',
            border: 'none',
            color: '#8b949e',
            cursor: 'pointer',
            fontSize: '12px',
            padding: '2px 8px',
          }}
        >
          {copied ? '✓ Copied' : 'Copy'}
        </button>
      </div>
      <div className="case-study-code-content">
        <pre><code>{code}</code></pre>
      </div>
      {explanation && (
        <div className="case-study-code-explanation">{explanation}</div>
      )}
    </div>
  );
};

export default CodeBlock;
