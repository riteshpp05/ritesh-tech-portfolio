import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import "./styles/Work.css";
import WorkImage from "./WorkImage";
import { MdArrowBack, MdArrowForward } from "react-icons/md";

const projects = [
  {
    title: "Master Data Repository & Governance Platform",
    category: "Enterprise Data Management · SAP BTP",
    tools: "SAP CAP, Node.js, CDS, SAP HANA Cloud, XSUAA, SAP Build Process Automation, OData V4",
    image: "/images/sap_ai_core.png",
    slug: "mdr",
  },
  {
    title: "CEO-Tower",
    category: "Generative AI & Financial Intelligence",
    tools: "React, TypeScript, Python, FastAPI, Llama.cpp, RAG, Supabase, Zoho Books APIs",
    image: "/images/ceo_chatbot.png",
    slug: "ceo-tower",
  },
  {
    title: "Industrial Object Detection & Quality Inspection",
    category: "Computer Vision & Edge Deployment",
    tools: "YOLO, AWS SageMaker, TensorFlow Lite, OpenCV, Python, Android",
    image: "/images/industrial_detection.png",
    slug: "industrial-object-detection",
  },
  {
    title: "Multimodal RAG Chatbot",
    category: "Document Intelligence & Conversational AI",
    tools: "Ollama, Llama 2 7B, Nomic Embeddings, FAISS, LangGraph, SQLite, OCR",
    image: "/images/rag_chatbot.png",
    slug: "multimodal-rag",
  },
  {
    title: "Medical Knowledge RAG Chatbot",
    category: "Healthcare AI · RAG + LangChain + AWS",
    tools: "GPT-4, LangChain, Sentence Transformers, Pinecone, AWS, Docker",
    image: "/images/medical_chatbot.png",
    slug: "medical-chatbot",
  },
  {
    title: "Virtual Kiosk — Offline Learning Platform",
    category: "EdTech & Offline Computing",
    tools: "Angular, Node.js, Express.js, pkg, JSON Routing",
    image: "/images/virtual_kiosk.png",
    slug: "virtual-kiosk",
  },
];

const Work = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const goToSlide = useCallback(
    (index: number) => {
      if (isAnimating) return;
      setIsAnimating(true);
      setCurrentIndex(index);
      setTimeout(() => setIsAnimating(false), 500);
    },
    [isAnimating]
  );

  const goToPrev = useCallback(() => {
    const newIndex =
      currentIndex === 0 ? projects.length - 1 : currentIndex - 1;
    goToSlide(newIndex);
  }, [currentIndex, goToSlide]);

  const goToNext = useCallback(() => {
    const newIndex =
      currentIndex === projects.length - 1 ? 0 : currentIndex + 1;
    goToSlide(newIndex);
  }, [currentIndex, goToSlide]);

  return (
    <section className="work-section" id="work" aria-label="Projects by Ritesh Patil">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>

        <div className="carousel-wrapper">
          {/* Slides */}
          <div className="carousel-track-container">
            <div
              className="carousel-track"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {projects.map((project, index) => (
                <div className="carousel-slide" key={index}>
                  <div className="carousel-content">
                    <div className="carousel-info">
                      <div className="carousel-number">
                        <h3>0{index + 1}</h3>
                      </div>
                      <div className="carousel-details">
                        <h4>{project.title}</h4>
                        <p className="carousel-category">
                          {project.category}
                        </p>
                        <div className="carousel-tools">
                          <span className="tools-label">Tools & Features</span>
                          <p>{project.tools}</p>
                        </div>
                        <Link
                          to={`/projects/${project.slug}`}
                          className="carousel-case-study-link"
                          data-cursor="disable"
                        >
                          Read Case Study →
                        </Link>
                      </div>
                    </div>
                    <div className="carousel-image-wrapper">
                      <WorkImage
                        image={project.image}
                        alt={project.title}
                        slug={project.slug}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Controls Footer */}
          <div className="carousel-controls">
            <button
              className="carousel-arrow"
              onClick={goToPrev}
              aria-label="Previous project"
              data-cursor="disable"
            >
              <MdArrowBack />
            </button>
            
            <div className="carousel-dots">
              {projects.map((_, index) => (
                <button
                  key={index}
                  className={`carousel-dot ${index === currentIndex ? "carousel-dot-active" : ""
                    }`}
                  onClick={() => goToSlide(index)}
                  aria-label={`Go to project ${index + 1}`}
                  data-cursor="disable"
                />
              ))}
            </div>

            <button
              className="carousel-arrow"
              onClick={goToNext}
              aria-label="Next project"
              data-cursor="disable"
            >
              <MdArrowForward />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Work;
