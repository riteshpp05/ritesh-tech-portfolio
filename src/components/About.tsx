import "./styles/About.css";

const About = () => {
  return (
    <section
      className="about-section"
      id="about"
      aria-label="About Ritesh Patil"
      itemScope
      itemType="https://schema.org/Person"
    >
      <meta itemProp="name" content="Ritesh Patil" />
      <meta itemProp="jobTitle" content="AI/ML Engineer & Generative AI Developer" />
      <meta itemProp="worksFor" content="Abhiyanta India Solutions" />
      <meta itemProp="url" content="https://riteshpatil.com/" />
      <div className="about-me">
        <h2 className="title">About Me</h2>
        <p className="para" itemProp="description">
          I'm an <strong>AI/ML Engineer & Generative AI Developer</strong> based in{" "}
          <span itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
            <span itemProp="addressLocality">Pune</span>,{" "}
            <span itemProp="addressRegion">Maharashtra</span>,{" "}
            <span itemProp="addressCountry">India</span>
          </span>
          , currently building enterprise AI at{" "}
          <strong itemProp="worksFor">Abhiyanta India Solutions</strong>.
          I specialize in RAG Systems, Agentic AI pipelines, LangChain, LangGraph,
          Computer Vision, and Cloud-Native AI Deployment — turning AI research into
          production systems that actually ship. From deploying Medical Chatbots on{" "}
          <strong>AWS EC2 with Docker</strong> to integrating Agentic AI into enterprise
          M365 workflows with <strong>SAP AI Core</strong> and{" "}
          <strong>Microsoft Copilot Studio</strong>, I focus on real-world impact over
          prototypes.
        </p>
      </div>
    </section>
  );
};

export default About;
