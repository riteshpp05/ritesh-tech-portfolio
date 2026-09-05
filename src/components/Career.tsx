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
                <h3>AI Engineer</h3>
                <h4>Abhiyanta India Solutions</h4>
              </div>
              <span className="career-date">Present</span>
            </div>
            <p>
              Designing and developing enterprise AI solutions using SAP AI Core, SAP BTP, and Microsoft Copilot Studio. Building Agentic Chatbots, orchestrating AI workflows, and integrating M365 services (Teams, Outlook, SharePoint) with modern RAG architectures and LLMs.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h3>Machine Learning Engineer</h3>
                <h4>Automation Teknix</h4>
              </div>
              <span className="career-date">2025–26</span>
            </div>
            <p>
              Built an end-to-end industrial object detection system using YOLO, deployed on AWS SageMaker and converted to TensorFlow Lite for an offline Android app.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h3>Software Engineer (Intern)</h3>
                <h4>Jnana Prabodhini</h4>
              </div>
              <span className="career-date">2025</span>
            </div>
            <p>
              Contributed to developing offline and online Virtual Kiosks using AngularJS, engineered responsive UIs, and enabled smart JSON routing.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h3>Education</h3>
                <h4>MIT-WPU &amp; Garware College</h4>
              </div>
              <span className="career-date">2020–25</span>
            </div>
            <p>
              PG Diploma in AI &amp; ML from MIT World Peace University (2024–2025).
              B.Sc Computer Science from Abasaheb Garware College (2020–2023).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
