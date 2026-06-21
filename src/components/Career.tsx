import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>AI Intern</h4>
                <h5>Abhiyanta India Solutions</h5>
              </div>
              <h3>Present</h3>
            </div>
            <p>
              Designing and developing enterprise AI solutions using SAP AI Core, SAP BTP, and Microsoft Copilot Studio. Building Agentic Chatbots, orchestrating AI workflows, and integrating M365 services (Teams, Outlook, SharePoint) with modern RAG architectures and LLMs.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Machine Learning Engineer</h4>
                <h5>Automation Teknix</h5>
              </div>
              <h3>2025–26</h3>
            </div>
            <p>
              Built an end-to-end industrial object detection system using YOLO, deployed on AWS SageMaker and converted to TensorFlow Lite for an offline Android app.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Software Engineer (Intern)</h4>
                <h5>Jnana Prabodhini</h5>
              </div>
              <h3>2025</h3>
            </div>
            <p>
              Contributed to developing offline and online Virtual Kiosks using AngularJS, engineered responsive UIs, and enabled smart JSON routing.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Education</h4>
                <h5>MIT-WPU & Garware College</h5>
              </div>
              <h3>2020–25</h3>
            </div>
            <p>
              PG Diploma in AI & ML from MIT World Peace University (2024–2025).
              B.Sc Computer Science from Abasaheb Garware College (2020–2023).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
