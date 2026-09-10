import type { TechnicalSection } from '../../types/projectTypes';
import CodeBlock from './CodeBlock';

interface Props {
  sections: TechnicalSection[];
}

const TechnicalDeepDive = ({ sections }: Props) => {
  return (
    <div>
      {sections.map((section, i) => (
        <div key={i} className="case-study-subsection">
          <h4>{section.title}</h4>
          {section.content.map((p, j) => (
            <p key={j}>{p}</p>
          ))}
          {section.codeExample && (
            <CodeBlock
              language={section.codeExample.language}
              label={section.codeExample.label}
              code={section.codeExample.code}
              explanation={section.codeExample.explanation}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default TechnicalDeepDive;
