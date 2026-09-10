import type { EngineeringDecision } from '../../types/projectTypes';

interface Props {
  decisions: EngineeringDecision[];
}

const EngineeringDecisions = ({ decisions }: Props) => {
  return (
    <div className="case-study-decisions">
      {decisions.map((d, i) => (
        <div key={i} className="case-study-decision">
          <p className="case-study-decision-q">{d.question}</p>
          <p className="case-study-decision-a">{d.answer}</p>
        </div>
      ))}
    </div>
  );
};

export default EngineeringDecisions;
