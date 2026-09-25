import { useState, useRef, useEffect, FormEvent } from "react";
import {
  submitInquiry,
  type InquiryPayload,
} from "../../services/inquiryService";

/* ── Validation ────────────────────────────────────────────── */
interface FormErrors {
  name?: string;
  email?: string;
  serviceType?: string;
  description?: string;
}

function validateForm(data: InquiryPayload): FormErrors {
  const errors: FormErrors = {};
  if (!data.name.trim()) errors.name = "Please enter your name.";
  if (!data.email.trim()) {
    errors.email = "Please enter your email address.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (!data.serviceType || data.serviceType === "") {
    errors.serviceType = "Please select the type of work you need.";
  }
  if (!data.description.trim() || data.description.trim().length < 20) {
    errors.description =
      "Please describe your project in at least 20 characters.";
  }
  return errors;
}

/* ── Component ─────────────────────────────────────────────── */
const FreelanceInquiry = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const [form, setForm] = useState<InquiryPayload>({
    name: "",
    email: "",
    company: "",
    serviceType: "",
    description: "",
    budget: "",
    timeline: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  /* Scroll reveal */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("fl-visible");
        });
      },
      { threshold: 0.1 }
    );
    if (headerRef.current) observer.observe(headerRef.current);
    if (formRef.current) observer.observe(formRef.current);
    return () => observer.disconnect();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const currentErrors = validateForm({ ...form, [name]: e.target.value });
    setErrors((prev) => ({ ...prev, [name]: currentErrors[name as keyof FormErrors] }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, email: true, serviceType: true, description: true });
    const currentErrors = validateForm(form);
    if (Object.keys(currentErrors).length > 0) {
      setErrors(currentErrors);
      // Focus first error
      const firstKey = Object.keys(currentErrors)[0];
      const el = document.querySelector<HTMLElement>(`[name="${firstKey}"]`);
      el?.focus();
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const result = await submitInquiry(form);
      if (result.success) {
        setIsSuccess(true);
      } else {
        setSubmitError("Something went wrong. Please try again or email me directly.");
      }
    } catch {
      setSubmitError("Unable to submit. Please email me directly at riteshpatil702811@gmail.com");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fl-inquiry-inner">
          {/* Left column */}
          <div
            className="fl-inquiry-left fl-reveal"
            ref={headerRef}
          >
            <span className="fl-section-label">Start a Project</span>
            <h2>Let's build something useful.</h2>
            <p>
              Tell me what you're trying to build, automate, or improve. I'll
              review your inquiry and respond within 24 hours.
            </p>

            <div className="fl-inquiry-contact-links">
              <a
                href="mailto:riteshpatil702811@gmail.com"
                className="fl-inquiry-contact-link"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Email Ritesh Patil"
              >
                <span className="fl-inquiry-contact-icon" aria-hidden="true">✉</span>
                riteshpatil702811@gmail.com
              </a>
              <a
                href="https://www.linkedin.com/in/riteshpatil-32946b26b"
                className="fl-inquiry-contact-link"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Connect with Ritesh on LinkedIn"
              >
                <span className="fl-inquiry-contact-icon" aria-hidden="true">in</span>
                linkedin.com/in/riteshpatil
              </a>
            </div>
          </div>

          {/* Right column — form */}
          <div className="fl-reveal" ref={formRef} style={{ transitionDelay: "100ms" }}>
            {isSuccess ? (
              <div className="fl-form-success" role="alert">
                <span className="fl-form-success-icon" aria-hidden="true">✓</span>
                <h3>Inquiry received.</h3>
                <p>
                  Thanks for reaching out. I'll review your project details and
                  get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form
                className="fl-form"
                onSubmit={handleSubmit}
                noValidate
                aria-label="Project inquiry form"
              >
                {/* Row 1: Name + Email */}
                <div className="fl-form-row">
                  <div className="fl-form-field">
                    <label htmlFor="inquiry-name" className="fl-form-label">
                      Name <span aria-hidden="true">*</span>
                    </label>
                    <input
                      id="inquiry-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      className={`fl-form-input${errors.name ? " fl-error" : ""}`}
                      placeholder="Your full name"
                      value={form.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      aria-required="true"
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? "err-name" : undefined}
                    />
                    {errors.name && (
                      <span id="err-name" className="fl-form-error" role="alert">
                        {errors.name}
                      </span>
                    )}
                  </div>

                  <div className="fl-form-field">
                    <label htmlFor="inquiry-email" className="fl-form-label">
                      Email <span aria-hidden="true">*</span>
                    </label>
                    <input
                      id="inquiry-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      className={`fl-form-input${errors.email ? " fl-error" : ""}`}
                      placeholder="you@company.com"
                      value={form.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      aria-required="true"
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? "err-email" : undefined}
                    />
                    {errors.email && (
                      <span id="err-email" className="fl-form-error" role="alert">
                        {errors.email}
                      </span>
                    )}
                  </div>
                </div>

                {/* Company */}
                <div className="fl-form-field">
                  <label htmlFor="inquiry-company" className="fl-form-label">
                    Company / Organization
                  </label>
                  <input
                    id="inquiry-company"
                    name="company"
                    type="text"
                    autoComplete="organization"
                    className="fl-form-input"
                    placeholder="Your company or organization (optional)"
                    value={form.company}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>

                {/* Service Type */}
                <div className="fl-form-field">
                  <label htmlFor="inquiry-service" className="fl-form-label">
                    What do you need? <span aria-hidden="true">*</span>
                  </label>
                  <select
                    id="inquiry-service"
                    name="serviceType"
                    className={`fl-form-select${errors.serviceType ? " fl-error" : ""}`}
                    value={form.serviceType}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-required="true"
                    aria-invalid={!!errors.serviceType}
                    aria-describedby={errors.serviceType ? "err-service" : undefined}
                  >
                    <option value="">Select a service area…</option>
                    <option value="ai-genai">AI / GenAI</option>
                    <option value="ai-chatbot-rag">AI Chatbot / RAG</option>
                    <option value="automation">Business Automation</option>
                    <option value="web-app">Web Application</option>
                    <option value="data-analytics">Data / Analytics</option>
                    <option value="api-integration">API / System Integration</option>
                    <option value="custom-software">Custom Software</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.serviceType && (
                    <span id="err-service" className="fl-form-error" role="alert">
                      {errors.serviceType}
                    </span>
                  )}
                </div>

                {/* Description */}
                <div className="fl-form-field">
                  <label htmlFor="inquiry-description" className="fl-form-label">
                    Project description <span aria-hidden="true">*</span>
                  </label>
                  <textarea
                    id="inquiry-description"
                    name="description"
                    className={`fl-form-textarea${errors.description ? " fl-error" : ""}`}
                    placeholder="Describe your business problem, what you want to build or automate, and any relevant context…"
                    value={form.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    rows={5}
                    aria-required="true"
                    aria-invalid={!!errors.description}
                    aria-describedby={errors.description ? "err-desc" : undefined}
                  />
                  {errors.description && (
                    <span id="err-desc" className="fl-form-error" role="alert">
                      {errors.description}
                    </span>
                  )}
                </div>

                {/* Row 2: Budget + Timeline */}
                <div className="fl-form-row">
                  <div className="fl-form-field">
                    <label htmlFor="inquiry-budget" className="fl-form-label">
                      Budget range
                    </label>
                    <select
                      id="inquiry-budget"
                      name="budget"
                      className="fl-form-select"
                      value={form.budget}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <option value="">Select a range…</option>
                      <option value="under-25k">Under ₹25K</option>
                      <option value="25k-50k">₹25K – ₹50K</option>
                      <option value="50k-1l">₹50K – ₹1L</option>
                      <option value="1l-plus">₹1L+</option>
                      <option value="not-sure">Not sure yet</option>
                    </select>
                  </div>

                  <div className="fl-form-field">
                    <label htmlFor="inquiry-timeline" className="fl-form-label">
                      Timeline
                    </label>
                    <select
                      id="inquiry-timeline"
                      name="timeline"
                      className="fl-form-select"
                      value={form.timeline}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <option value="">Select a timeline…</option>
                      <option value="asap">ASAP</option>
                      <option value="1-2-months">1–2 months</option>
                      <option value="2-3-months">2–3 months</option>
                      <option value="flexible">Flexible</option>
                    </select>
                  </div>
                </div>

                {/* Submit error */}
                {submitError && (
                  <p
                    className="fl-form-error"
                    role="alert"
                    style={{ fontSize: "13px" }}
                  >
                    {submitError}
                  </p>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  className="fl-form-submit"
                  disabled={isSubmitting}
                  aria-disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span aria-live="polite">Sending…</span>
                  ) : (
                    "Start a Conversation →"
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
  );
};

export default FreelanceInquiry;
