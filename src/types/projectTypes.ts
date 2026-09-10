// ─── Project Case Study Type System ───

export interface CodeExample {
  language: string;
  label: string; // e.g., "Representative implementation"
  code: string;
  explanation: string;
}

export interface TechnicalSection {
  title: string;
  content: string[];  // array of paragraphs
  codeExample?: CodeExample;
}

export interface ArchitectureNode {
  label: string;
  description?: string;
}

export interface ArchitectureFlow {
  title: string;
  nodes: ArchitectureNode[];
}

export interface EngineeringDecision {
  question: string;   // e.g., "Why metadata-driven architecture?"
  answer: string;
}

export interface Challenge {
  challenge: string;
  solution: string;
}

export interface FlowStep {
  label: string;
  description?: string;
}

export interface TechCategory {
  category: string;  // e.g., "Backend", "AI / ML", "Cloud"
  items: string[];
}

export interface Project {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  role: string;
  domain: string;
  platform: string;
  stackSummary: string;   // short inline display, e.g., "SAP CAP · Node.js · CDS"
  heroImage?: string;
  github?: string;
  liveDemo?: string;

  overview: string[];           // paragraphs
  problem: string[];            // paragraphs
  goals: string[];              // bullet points
  myRole: string[];             // paragraphs (first-person)

  architectureFlows: ArchitectureFlow[];
  architectureDescription?: string;

  technicalSections: TechnicalSection[];
  engineeringDecisions: EngineeringDecision[];
  challenges: Challenge[];

  endToEndFlow: FlowStep[];

  techStack: TechCategory[];

  outcome: string[];            // bullet points
  learnings: string[];          // paragraphs
}
