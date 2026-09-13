import * as THREE from "three";
import { useRef, useMemo, useState, useEffect, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { EffectComposer, N8AO } from "@react-three/postprocessing";
import {
  BallCollider,
  Physics,
  RigidBody,
  RapierRigidBody,
} from "@react-three/rapier";

// ---------------------------------------------------------------------------
// Technology definitions – 22 AI/ML, GenAI, Cloud & Data technologies
// ---------------------------------------------------------------------------
interface TechDef {
  name: string;
  label: string; // text rendered on sphere
  primary: string; // gradient start
  secondary: string; // gradient end
  text: string; // label colour
  imageSrc?: string; // optional local SVG/PNG
}

const technologies: TechDef[] = [
  // --- Core Language ---
  { name: "Python",          label: "Python",          primary: "#3776AB", secondary: "#1a3f5e", text: "#FFFFFF", imageSrc: "/assets/logos/python.svg" },

  // --- GenAI / LLM Framework ---
  { name: "LangChain",       label: "LangChain",       primary: "#1C3C3C", secondary: "#0a1e1e", text: "#FFFFFF", imageSrc: "/assets/logos/langchain.svg" },
  { name: "LangGraph",       label: "LangGraph",       primary: "#0F3460", secondary: "#071a30", text: "#FFFFFF", imageSrc: "/assets/logos/langgraph.svg" },
  { name: "OpenAI",          label: "OpenAI",          primary: "#412991", secondary: "#1a1045", text: "#FFFFFF", imageSrc: "/assets/logos/openai.svg" },
  { name: "Ollama",          label: "Ollama",          primary: "#1A1A2E", secondary: "#0a0a15", text: "#FFFFFF", imageSrc: "/assets/logos/ollama.svg" },
  { name: "HuggingFace",     label: "Hugging Face",    primary: "#FF9D00", secondary: "#b36e00", text: "#FFFFFF", imageSrc: "/assets/logos/huggingface.svg" },

  // --- AI Paradigms ---
  { name: "RAG",             label: "RAG",             primary: "#7C3AED", secondary: "#4c1d95", text: "#FFFFFF", imageSrc: "/assets/logos/rag.png" },
  { name: "AgenticAI",       label: "Agentic AI",      primary: "#06B6D4", secondary: "#044e5a", text: "#FFFFFF", imageSrc: "/assets/logos/agenticai.png" },

  // --- Databases & Vector Stores ---
  { name: "SQLite",          label: "SQLite",          primary: "#003B57", secondary: "#001a2b", text: "#FFFFFF", imageSrc: "/assets/logos/sqlite.svg" },
  { name: "MySQL",           label: "MySQL",           primary: "#4479A1", secondary: "#2a4d65", text: "#FFFFFF", imageSrc: "/assets/logos/mysql.svg" },
  { name: "Neo4j",           label: "Neo4j",           primary: "#018BFF", secondary: "#005fa3", text: "#FFFFFF", imageSrc: "/assets/logos/neo4j.svg" },
  { name: "Pinecone",        label: "Pinecone",        primary: "#0E0E2C", secondary: "#06061a", text: "#FFFFFF", imageSrc: "/assets/logos/pinecone.png" },
  { name: "Streamlit",       label: "Streamlit",       primary: "#FF4B4B", secondary: "#b32626", text: "#FFFFFF", imageSrc: "/assets/logos/streamlit.svg" },

  // --- Cloud & SAP ---
  { name: "AWS",             label: "AWS",             primary: "#232F3E", secondary: "#131920", text: "#FFFFFF", imageSrc: "/assets/logos/aws.svg" },
  { name: "SAP",             label: "SAP",             primary: "#0FAAFF", secondary: "#0077b3", text: "#FFFFFF", imageSrc: "/assets/logos/sap.svg" },
  { name: "SAPBTP",          label: "SAP BTP",         primary: "#0FAAFF", secondary: "#0077b3", text: "#FFFFFF", imageSrc: "/assets/logos/sapbtp.svg" },
  { name: "SAPAICore",       label: "SAP AI Core",     primary: "#1661BE", secondary: "#0d3d75", text: "#FFFFFF", imageSrc: "/assets/logos/sapaicore.svg" },

  // --- DevOps ---
  { name: "Docker",          label: "Docker",          primary: "#2496ED", secondary: "#1565a0", text: "#FFFFFF", imageSrc: "/assets/logos/docker.svg" },
  { name: "Kubernetes",      label: "Kubernetes",      primary: "#326CE5", secondary: "#1e4290", text: "#FFFFFF", imageSrc: "/assets/logos/kubernetes.svg" },
  { name: "GitHub",          label: "GitHub",          primary: "#24292E", secondary: "#0d1117", text: "#FFFFFF", imageSrc: "/assets/logos/github.svg" },

  // --- Analytics & Automation ---
  { name: "PowerBI",         label: "Power BI",        primary: "#F2C811", secondary: "#c9a70e", text: "#FFFFFF", imageSrc: "/assets/logos/powerbi.svg" },
  { name: "PowerAutomate",   label: "Power Automate",  primary: "#0066FF", secondary: "#0044aa", text: "#FFFFFF", imageSrc: "/assets/logos/powerautomate.svg" },
  { name: "Copilot",         label: "MS Copilot",      primary: "#7B68EE", secondary: "#4c3dba", text: "#FFFFFF", imageSrc: "/assets/logos/copilot.svg" },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function lightenHex(hex: string, amount: number): string {
  const n = parseInt(hex.replace("#", ""), 16);
  const r = Math.min(255, (n >> 16) + amount);
  const g = Math.min(255, ((n >> 8) & 0xff) + amount);
  const b = Math.min(255, (n & 0xff) + amount);
  return `rgb(${r},${g},${b})`;
}

// ---------------------------------------------------------------------------
// Canvas texture generator — 2:1 spherical map with FRONT and BACK badges
// ---------------------------------------------------------------------------
function createCanvasTexture(tech: TechDef): THREE.CanvasTexture {
  const W = 1024;
  const H = 512;
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d")!;

  const renderBackground = () => {
    // Fill full width with gradient
    const grad = ctx.createLinearGradient(0, 0, W, H);
    grad.addColorStop(0, tech.secondary);
    grad.addColorStop(0.25, tech.primary);
    grad.addColorStop(0.5, lightenHex(tech.primary, 30));
    grad.addColorStop(0.75, tech.primary);
    grad.addColorStop(1, tech.secondary);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);
  };

  const renderBadgeAt = (centerX: number, centerY: number, imgElement?: HTMLImageElement) => {
    // Subtle decorative ring
    ctx.save();
    ctx.strokeStyle = `${tech.text}28`;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(centerX, centerY, H * 0.32, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();

    if (imgElement && imgElement.complete && (imgElement.naturalWidth || imgElement.width)) {
      const rawW = imgElement.naturalWidth || imgElement.width || 512;
      const rawH = imgElement.naturalHeight || imgElement.height || 512;
      const aspect = rawH > 0 ? rawW / rawH : 1;
      const validAspect = isFinite(aspect) && aspect > 0 ? aspect : 1;

      const maxDim = H * 0.44;
      let drawW = maxDim;
      let drawH = maxDim;
      if (validAspect > 1) {
        drawW = maxDim;
        drawH = maxDim / validAspect;
      } else {
        drawH = maxDim;
        drawW = maxDim * validAspect;
      }
      ctx.drawImage(imgElement, centerX - drawW / 2, centerY - drawH / 2, drawW, drawH);
    } else {
      // Text fallback
      const lines = tech.label.split("\n");
      const maxChars = Math.max(...lines.map((l) => l.length));
      let fontSize = Math.min(H / (maxChars * 0.65), H / (lines.length * 2.2));
      fontSize = Math.min(fontSize, 90);
      fontSize = Math.max(fontSize, 32);

      ctx.font = `700 ${fontSize}px "Geist","Inter","Segoe UI",system-ui,sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = tech.text;

      const lineHeight = fontSize * 1.15;
      const startY = centerY - ((lines.length - 1) * lineHeight) / 2;
      lines.forEach((line, i) => ctx.fillText(line, centerX, startY + i * lineHeight));
    }
  };

  const drawAll = (imgElement?: HTMLImageElement) => {
    renderBackground();
    // In Three.js SphereGeometry equirectangular UV:
    // U = 0.25 is FRONT face (facing +Z)
    // U = 0.75 is BACK face (facing -Z)
    renderBadgeAt(W * 0.25, H / 2, imgElement);
    renderBadgeAt(W * 0.75, H / 2, imgElement);
  };

  // 1. Draw fallback text immediately so the sphere is NEVER blank on screen
  drawAll();

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.needsUpdate = true;

  // 2. If image provided, load and redraw both sides
  if (tech.imageSrc) {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = tech.imageSrc;
    img.onload = () => {
      drawAll(img);
      tex.needsUpdate = true;
    };
    img.onerror = () => {
      // Text fallback is already drawn
      console.warn("Using text fallback for:", tech.name);
    };
  }

  return tex;
}

// ---------------------------------------------------------------------------
// Pre-computed geometry & sphere configs
// ---------------------------------------------------------------------------
const sphereGeometry = new THREE.SphereGeometry(1, 28, 28);

const isMobileScreen = typeof window !== "undefined" && window.innerWidth < 768;
const scaleMultiplier = isMobileScreen ? 1.2 : 1;

const spheres = technologies.map((_, i) => ({
  scale: [0.75, 0.85, 0.95, 1, 0.8][i % 5] * scaleMultiplier,
}));

// ---------------------------------------------------------------------------
// SphereGeo – a single physics-driven sphere
// ---------------------------------------------------------------------------
type SphereProps = {
  scale: number;
  r?: typeof THREE.MathUtils.randFloatSpread;
  material: THREE.MeshPhysicalMaterial;
  isActive: boolean;
  isMobile: boolean;
};

function SphereGeo({
  scale,
  r = THREE.MathUtils.randFloatSpread,
  material,
  isActive,
  isMobile,
}: SphereProps) {
  const api = useRef<RapierRigidBody | null>(null);
  const initialYRot = useMemo(() => Math.random() * Math.PI * 2, []);
  // Random small spin direction
  const spinSpeed = useMemo(() => (Math.random() > 0.5 ? 0.025 : -0.025), []);

  useFrame((_state, delta) => {
    if (!isActive || !api.current) return;
    delta = Math.min(0.05, delta);

    const trans = api.current.translation();
    const factor = delta * scale;

    // Gentle spring force towards (0, 0, 0)
    // On mobile, balanced X and Y so spheres form a tight cluster in center
    const kX = isMobile ? 80 : 50;
    const kY = isMobile ? 85 : 140;
    const kZ = 60;

    const impulse = new THREE.Vector3(
      -trans.x * kX * factor,
      -trans.y * kY * factor,
      -trans.z * kZ * factor
    );

    api.current.applyImpulse(impulse, true);

    // Gentle ambient spin around Y axis so logos continuously reveal themselves
    api.current.applyTorqueImpulse(new THREE.Vector3(0, spinSpeed * factor, 0), true);
  });

  return (
    <RigidBody
      linearDamping={0.85}
      angularDamping={0.35}
      friction={0.2}
      position={[r(10), r(8), r(8)]}
      rotation={[0, initialYRot, 0]}
      ref={api}
      colliders={false}
      enabledRotations={[false, true, false]}
    >
      <BallCollider args={[scale]} />
      <mesh
        castShadow
        receiveShadow
        scale={scale}
        geometry={sphereGeometry}
        material={material}
        rotation={[0, 0, 0]}
      />
    </RigidBody>
  );
}

// ---------------------------------------------------------------------------
// Pointer – interactive kinematic body that follows touch/cursor
// ---------------------------------------------------------------------------
type PointerProps = {
  isActive: boolean;
  isMobile: boolean;
};

function Pointer({ isActive, isMobile }: PointerProps) {
  const ref = useRef<RapierRigidBody>(null);
  const vec = useRef(new THREE.Vector3());
  const isInteracting = useRef(false);

  useEffect(() => {
    const onTouchStart = () => { isInteracting.current = true; };
    const onTouchEnd = () => { isInteracting.current = false; };
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  useFrame(({ pointer, viewport }) => {
    if (!isActive || !ref.current) return;

    // On mobile: only push if actively touching
    // On desktop: follow mouse cursor
    const active = !isMobile || isInteracting.current;

    if (active && (pointer.x !== 0 || pointer.y !== 0 || isInteracting.current)) {
      const targetVec = vec.current.lerp(
        new THREE.Vector3(
          (pointer.x * viewport.width) / 2,
          (pointer.y * viewport.height) / 2,
          0
        ),
        0.25
      );
      ref.current.setNextKinematicTranslation(targetVec);
    } else {
      // Park collider far away so spheres cluster cleanly in center
      ref.current.setNextKinematicTranslation(new THREE.Vector3(100, 100, 100));
    }
  });

  return (
    <RigidBody
      position={[100, 100, 100]}
      type="kinematicPosition"
      colliders={false}
      ref={ref}
    >
      <BallCollider args={[2]} />
    </RigidBody>
  );
}

// ---------------------------------------------------------------------------
// TechStack – main exported component
// ---------------------------------------------------------------------------
const TechStack = () => {
  const [isActive, setIsActive] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setIsActive(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const materials = useMemo(() => {
    return technologies.map((tech) => {
      const canvasTex = createCanvasTexture(tech);
      return new THREE.MeshPhysicalMaterial({
        map: canvasTex,
        emissive: "#ffffff",
        emissiveMap: canvasTex,
        emissiveIntensity: 0.35,
        metalness: 0.45,
        roughness: 0.85,
        clearcoat: 0.2,
      });
    });
  }, []);

  return (
    <div className="techstack" ref={containerRef}>
      <h2>My Techstack</h2>

      <Canvas
        shadows
        gl={{
          alpha: true,
          stencil: false,
          depth: false,
          antialias: false,
          powerPreference: "high-performance",
        }}
        camera={{
          position: [0, 0, isMobile ? 21 : 20],
          fov: isMobile ? 48 : 32.5,
          near: 1,
          far: 100,
        }}
        onCreated={(state) => (state.gl.toneMappingExposure = 1.5)}
        className="tech-canvas"
      >
        <Suspense fallback={null}>
          <ambientLight intensity={1.2} />
          <spotLight
            position={[20, 20, 25]}
            penumbra={1}
            angle={0.25}
            color="white"
            castShadow
            shadow-mapSize={[512, 512]}
          />
          <directionalLight position={[0, 5, -4]} intensity={2} />
          <Physics gravity={[0, 0, 0]}>
            <Pointer isActive={isActive} isMobile={isMobile} />
            {spheres.map((props, i) => (
              <SphereGeo
                key={i}
                {...props}
                material={materials[i]}
                isActive={isActive}
                isMobile={isMobile}
              />
            ))}
          </Physics>
          <Environment
            files="/models/char_enviorment.hdr"
            environmentIntensity={0.5}
            environmentRotation={[0, 4, 2]}
          />
          <EffectComposer enableNormalPass={false}>
            <N8AO color="#0f002c" aoRadius={2} intensity={1.15} />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
};

export default TechStack;
