import { scrollToLenis } from "../../components/utils/lenisProvider";

const FreelanceHero = () => {
  return (
    <section className="fl-hero" aria-label="Introduction & Overview">
      <div className="fl-container">
        <div className="fl-hero-grid">
          {/* Left Column: Direct Human Headline & Value Proposition */}
          <div className="fl-hero-content">
            <div className="fl-hero-eyebrow" aria-label="Current status">
              <span className="fl-hero-eyebrow-dot" aria-hidden="true" />
              <span className="fl-hero-eyebrow-text">Available for Select Contracts · Q2 2026</span>
            </div>

            <h1 className="fl-hero-h1">
              Engineering production AI systems & software that{" "}
              <em>actually works.</em>
            </h1>

            <p className="fl-hero-sub">
              Hi, I'm Ritesh. I'm an independent AI/ML engineer based in Pune. I help
              startups, founders, and engineering teams build grounded RAG pipelines,
              intelligent workflow automations, and full-stack web platforms from concept to
              production deployment.
            </p>

            <div className="fl-hero-highlights">
              <div className="fl-highlight-item">
                <span className="fl-highlight-check" aria-hidden="true">✓</span>
                <span><strong>Direct engineer access:</strong> No account managers or agency markups.</span>
              </div>
              <div className="fl-highlight-item">
                <span className="fl-highlight-check" aria-hidden="true">✓</span>
                <span><strong>Enterprise data privacy:</strong> On-premise &amp; private VPC local LLM inference.</span>
              </div>
              <div className="fl-highlight-item">
                <span className="fl-highlight-check" aria-hidden="true">✓</span>
                <span><strong>Production-first delivery:</strong> CI/CD, Dockerized deployments, and full IP handoff.</span>
              </div>
            </div>

            <div className="fl-hero-ctas">
              <a
                href="#inquiry"
                className="fl-btn-primary"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToLenis("#inquiry", { offset: -20, duration: 1.3 });
                }}
              >
                Start a Project / Discuss Scope ↗
              </a>
              <a
                href="#case-studies"
                className="fl-btn-secondary"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToLenis("#case-studies", { offset: -20, duration: 1.2 });
                }}
              >
                See Case Studies ↓
              </a>
            </div>
          </div>

          {/* Right Column: Senior Engineer Technical Ledger Card */}
          <div className="fl-hero-terminal-wrapper" aria-label="Technical Ledger">
            <div className="fl-hero-terminal">
              <div className="fl-terminal-header">
                <div className="fl-terminal-dots">
                  <span className="fl-dot-red" />
                  <span className="fl-dot-yellow" />
                  <span className="fl-dot-green" />
                </div>
                <span className="fl-terminal-title">ritesh@workstation:~/engineering</span>
                <span className="fl-terminal-badge">READY</span>
              </div>

              <div className="fl-terminal-body">
                <div className="fl-term-section">
                  <p className="fl-term-muted"># Core Specializations</p>
                  <div className="fl-term-row">
                    <span className="fl-term-tag">RAG &amp; Search</span>
                    <span className="fl-term-desc">Hybrid vector search, chunking, rerankers, citation grounding</span>
                  </div>
                  <div className="fl-term-row">
                    <span className="fl-term-tag">Local LLMs</span>
                    <span className="fl-term-desc">Llama.cpp, Ollama, private on-premise execution, zero data leakage</span>
                  </div>
                  <div className="fl-term-row">
                    <span className="fl-term-tag">Automations</span>
                    <span className="fl-term-desc">Enterprise API glue, webhook pipelines, SAP/Zoho integrations</span>
                  </div>
                  <div className="fl-term-row">
                    <span className="fl-term-tag">Full-Stack</span>
                    <span className="fl-term-desc">React, TypeScript, FastAPI, Python, PostgreSQL, Docker</span>
                  </div>
                </div>

                <div className="fl-term-divider" />

                <div className="fl-term-section">
                  <p className="fl-term-muted"># Engagement Quick Facts</p>
                  <div className="fl-term-stats">
                    <div className="fl-term-stat">
                      <span className="fl-stat-label">Availability</span>
                      <span className="fl-stat-val">1–2 Project Slots</span>
                    </div>
                    <div className="fl-term-stat">
                      <span className="fl-stat-label">Typical Turnaround</span>
                      <span className="fl-stat-val">2–4 Weeks (MVP)</span>
                    </div>
                    <div className="fl-term-stat">
                      <span className="fl-stat-label">Base Location</span>
                      <span className="fl-stat-val">Pune, India (Remote)</span>
                    </div>
                  </div>
                </div>

                <div className="fl-term-footer">
                  <span className="fl-term-command">$ git status: working tree clean</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FreelanceHero;
