import type { Challenge } from '../../types/projectTypes';

interface Props {
  challenges: Challenge[];
}

const ChallengesSection = ({ challenges }: Props) => {
  return (
    <div className="case-study-challenges">
      {challenges.map((c, i) => (
        <div key={i} className="case-study-challenge-card">
          <div>
            <span className="case-study-challenge-label challenge">Challenge</span>
            <p className="case-study-challenge-text">{c.challenge}</p>
          </div>
          <div style={{ marginTop: '16px' }}>
            <span className="case-study-challenge-label solution">Solution</span>
            <p className="case-study-challenge-text">{c.solution}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChallengesSection;
