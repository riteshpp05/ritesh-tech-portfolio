import { useEffect } from "react";
import "../components/styles/Freelance.css";
import FreelanceNavbar from "./freelance/FreelanceNavbar";
import FreelanceHero from "./freelance/FreelanceHero";
import FreelanceServices from "./freelance/FreelanceServices";
import FreelanceCaseStudies from "./freelance/FreelanceCaseStudies";
import FreelanceProcess from "./freelance/FreelanceProcess";
import FreelanceWhyMe from "./freelance/FreelanceWhyMe";
import FreelanceEngagement from "./freelance/FreelanceEngagement";
import FreelancePortfolioLink from "./freelance/FreelancePortfolioLink";
import FreelanceInquiry from "./freelance/FreelanceInquiry";
import FreelanceFinalCTA from "./freelance/FreelanceFinalCTA";
import FreelanceFooter from "./freelance/FreelanceFooter";

const FreelancePage = () => {
  /* ── SEO: dynamic page title + meta ────────────────────── */
  useEffect(() => {
    const prevTitle = document.title;

    document.title = "Freelance AI & Software Development | Ritesh Patil";

    const metaDesc = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const prevDesc = metaDesc?.content ?? "";
    if (metaDesc) {
      metaDesc.content =
        "Ritesh Patil provides AI development, GenAI, automation, web application, data and software engineering solutions for businesses. Start a project today.";
    }

    const ogTitle = document.querySelector<HTMLMetaElement>('meta[property="og:title"]');
    const prevOgTitle = ogTitle?.content ?? "";
    if (ogTitle) ogTitle.content = "Freelance AI & Software Development | Ritesh Patil";

    const ogDesc = document.querySelector<HTMLMetaElement>('meta[property="og:description"]');
    const prevOgDesc = ogDesc?.content ?? "";
    if (ogDesc)
      ogDesc.content =
        "Ritesh Patil — AI/ML Engineer available for freelance AI, automation, web application and software engineering projects.";

    const ogUrl = document.querySelector<HTMLMetaElement>('meta[property="og:url"]');
    const prevOgUrl = ogUrl?.content ?? "";
    if (ogUrl) ogUrl.content = "https://riteshpatil.com/freelance";

    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    const prevCanonical = canonical?.href ?? "";
    if (canonical) canonical.href = "https://riteshpatil.com/freelance";

    return () => {
      document.title = prevTitle;
      if (metaDesc) metaDesc.content = prevDesc;
      if (ogTitle) ogTitle.content = prevOgTitle;
      if (ogDesc) ogDesc.content = prevOgDesc;
      if (ogUrl) ogUrl.content = prevOgUrl;
      if (canonical) canonical.href = prevCanonical;
    };
  }, []);

  return (
    <div className="fl-page" id="fl-top">
      {/* Skip link */}
      <a href="#inquiry" className="skip-to-content" aria-label="Skip to project inquiry form">
        Skip to project inquiry
      </a>

      {/* Navbar */}
      <FreelanceNavbar />

      {/* Main content */}
      <main>
        {/* 01 — Hero */}
        <FreelanceHero />

        <div className="fl-divider" aria-hidden="true" />

        {/* 02 — Services */}
        <section className="fl-section fl-bg-white" id="services" aria-label="Services">
          <div className="fl-container">
            <FreelanceServices />
          </div>
        </section>

        <div className="fl-divider" aria-hidden="true" />

        {/* 03 — Case Studies */}
        <section className="fl-section fl-bg-ghost" id="case-studies" aria-label="Selected case studies">
          <div className="fl-container">
            <FreelanceCaseStudies />
          </div>
        </section>

        <div className="fl-divider" aria-hidden="true" />

        {/* 04 — Process */}
        <section className="fl-section fl-bg-white" id="process" aria-label="How I work">
          <div className="fl-container">
            <FreelanceProcess />
          </div>
        </section>

        <div className="fl-divider" aria-hidden="true" />

        {/* 05 — Why Me */}
        <section className="fl-section fl-bg-ghost" id="why" aria-label="Why work with Ritesh">
          <div className="fl-container">
            <FreelanceWhyMe />
          </div>
        </section>

        <div className="fl-divider" aria-hidden="true" />

        {/* 06 — Engagement */}
        <section className="fl-section fl-bg-white" id="engagement" aria-label="Engagement models">
          <div className="fl-container">
            <FreelanceEngagement />
          </div>
        </section>

        <div className="fl-divider" aria-hidden="true" />

        {/* 07 — Portfolio Link */}
        <FreelancePortfolioLink />

        <div className="fl-divider" aria-hidden="true" />

        {/* 08 — Inquiry Form */}
        <section className="fl-section fl-bg-white" id="inquiry" aria-label="Project inquiry form">
          <div className="fl-container">
            <FreelanceInquiry />
          </div>
        </section>

        {/* 09 — Final CTA */}
        <FreelanceFinalCTA />
      </main>

      {/* Footer */}
      <FreelanceFooter />
    </div>
  );
};

export default FreelancePage;
