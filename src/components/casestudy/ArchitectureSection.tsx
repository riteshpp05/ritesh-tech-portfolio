import type { ArchitectureFlow } from '../../types/projectTypes';

interface Props {
  flows: ArchitectureFlow[];
}

const ArchitectureSection = ({ flows }: Props) => {
  return (
    <div className="case-study-architecture">
      {flows.map((flow, i) => (
        <div key={i} className="case-study-arch-flow">
          <div className="case-study-arch-flow-title">{flow.title}</div>
          <div className="case-study-arch-nodes">
            {flow.nodes.map((node, j) => (
              <span key={j} style={{ display: 'contents' }}>
                <div className="case-study-arch-node" title={node.description}>
                  {node.label}
                </div>
                {j < flow.nodes.length - 1 && (
                  <span className="case-study-arch-arrow">→</span>
                )}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ArchitectureSection;
