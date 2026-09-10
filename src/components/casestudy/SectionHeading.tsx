interface Props {
  number: string;
  title: string;
}

const SectionHeading = ({ number, title }: Props) => {
  return (
    <div className="case-study-section-header">
      <span className="case-study-section-number">{number}</span>
      <h2 className="case-study-section-title">{title}</h2>
    </div>
  );
};

export default SectionHeading;
