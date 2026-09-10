import type { TechCategory } from '../../types/projectTypes';

interface Props {
  categories: TechCategory[];
}

const TechStackSection = ({ categories }: Props) => {
  return (
    <div className="case-study-tech-grid">
      {categories.map((cat, i) => (
        <div key={i} className="case-study-tech-category">
          <div className="case-study-tech-category-title">{cat.category}</div>
          <div className="case-study-tech-items">
            {cat.items.map((item, j) => (
              <span key={j} className="case-study-tech-tag">{item}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TechStackSection;
