import type { FlowStep } from '../../types/projectTypes';

interface Props {
  steps: FlowStep[];
}

const FlowDiagram = ({ steps }: Props) => {
  return (
    <div className="case-study-flow">
      {steps.map((step, i) => (
        <span key={i} style={{ display: 'contents' }}>
          <div className="case-study-flow-step" title={step.description}>
            {step.label}
          </div>
          {i < steps.length - 1 && (
            <span className="case-study-flow-arrow">→</span>
          )}
        </span>
      ))}
    </div>
  );
};

export default FlowDiagram;
