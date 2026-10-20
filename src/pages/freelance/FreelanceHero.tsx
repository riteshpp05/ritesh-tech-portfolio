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
              <span className="fl-hero-eyebrow-text">AVAILABLE FOR SELECT CONTRACTS · 2026</span>
            </div>

            <h1 className="fl-hero-h1">
              ENGINEERING PRODUCTION AI &amp; SOFTWARE THAT{" "}
              <span className="fl-hero-marker">ACTUALLY WORKS.</span>
            </h1>

            <p className="fl-hero-sub">
              Hi, I'm Ritesh. I'm an independent AI/ML engineer based in Pune. I help
              startups, founders, and engineering teams build grounded RAG pipelines,
              private local LLM systems, and high-performance web platforms from concept to
              production deployment.
            </p>

            <div className="fl-hero-highlights">
              <div className="fl-highlight-item">
                <span className="fl-highlight-check" aria-hidden="true">✓</span>
                <div>
                  <strong>Direct engineer access:</strong> Direct collaboration with no account managers or agency overhead.
                </div>
              </div>
              <div className="fl-highlight-item">
                <span className="fl-highlight-check" aria-hidden="true">✓</span>
                <div>
                  <strong>Enterprise data privacy:</strong> On-premise &amp; private VPC local LLM inference with zero data leakage.
                </div>
              </div>
              <div className="fl-highlight-item">
                <span className="fl-highlight-check" aria-hidden="true">✓</span>
                <div>
                  <strong>Production-first delivery:</strong> CI/CD, Dockerized deployments, thorough testing, and full IP handoff.
                </div>
              </div>
            </div>

            <div className="fl-hero-ctas">
              <a
                href="#inquiry"
                className="fl-btn-primary"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToLenis("#inquiry", { offset: -24, duration: 1.2 });
                }}
              >
                START A PROJECT / DISCUSS SCOPE ↗
              </a>
              <a
                href="#case-studies"
                className="fl-btn-secondary"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToLenis("#case-studies", { offset: -24, duration: 1.2 });
                }}
              >
                EXPLORE CASE STUDIES ↓
              </a>
            </div>
          </div>

          {/* Right Column: Senior Engineer Technical Ledger Card */}
          <div className="fl-hero-terminal-wrapper" aria-label="Technical Ledger">
            <div className="fl-hero-terminal">
              <div className="fl-terminal-header">
                <div className="fl-terminal-dots">
                  <span className="fl-dot-black" />
                  <span className="fl-dot-black" />
                  <span className="fl-dot-black" />
                </div>
                <span className="fl-terminal-title">ritesh@workstation:~/engineering</span>
                <span className="fl-terminal-badge">LIVE · READY</span>
              </div>

              <div className="fl-terminal-body">
                <div className="fl-term-section">
                  <p className="fl-term-muted"># CORE SPECIALIZATIONS</p>
                  <div className="fl-term-row">
                    <span className="fl-term-tag rag">RAG &amp; SEARCH</span>
                    <span className="fl-term-desc">Hybrid vector search, chunking, rerankers, citation grounding</span>
                  </div>
                  <div className="fl-term-row">
                    <span className="fl-term-tag llm">LOCAL LLMS</span>
                    <span className="fl-term-desc">Llama.cpp, Ollama, private on-premise execution, zero data leakage</span>
                  </div>
                  <div className="fl-term-row">
                    <span className="fl-term-tag auto">AUTOMATION</span>
                    <span className="fl-term-desc">Enterprise API pipelines, webhook orchestration, SAP/Zoho integrations</span>
                  </div>
                  <div className="fl-term-row">
                    <span className="fl-term-tag stack">FULL-STACK</span>
                    <span className="fl-term-desc">React, TypeScript, FastAPI, Python, PostgreSQL, Docker</span>
                  </div>
                </div>

                <div className="fl-term-divider" />

                <div className="fl-term-section">
                  <p className="fl-term-muted"># ENGAGEMENT METRICS</p>
                  <div className="fl-term-stats">
                    <div className="fl-term-stat">
                      <span className="fl-stat-label">AVAILABILITY</span>
                      <span className="fl-stat-val">1–2 SLOTS</span>
                    </div>
                    <div className="fl-term-stat">
                      <span className="fl-stat-label">TURNAROUND</span>
                      <span className="fl-stat-val">2–4 WEEKS</span>
                    </div>
                    <div className="fl-term-stat">
                      <span className="fl-stat-label">LOCATION</span>
                      <span className="fl-stat-val">PUNE (REMOTE)</span>
                    </div>
                  </div>
                </div>

                <div className="fl-term-footer">
                  <span className="fl-term-command">$ git status: working tree clean (ready to deploy)</span>
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
