import * as THREE from "three";
import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { EffectComposer, N8AO } from "@react-three/postprocessing";
import {
  BallCollider,
  Physics,
  RigidBody,
  CylinderCollider,
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
  imageSrc?: string; // optional local PNG (overrides canvas texture)
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
// Canvas texture generator — creates a high-res branded sphere texture
// ---------------------------------------------------------------------------
function lightenHex(hex: string, amount: number): string {
  const n = parseInt(hex.replace("#", ""), 16);
  const r = Math.min(255, (n >> 16) + amount);
  const g = Math.min(255, ((n >> 8) & 0xff) + amount);
  const b = Math.min(255, (n & 0xff) + amount);
  return `rgb(${r},${g},${b})`;
}

function createCanvasTexture(tech: TechDef): THREE.CanvasTexture {
  const S = 512;
  const canvas = document.createElement("canvas");
  canvas.width = S;
  canvas.height = S;
  const ctx = canvas.getContext("2d")!;

  // --- radial gradient background ---
  const grad = ctx.createRadialGradient(S * 0.42, S * 0.38, S * 0.04, S / 2, S / 2, S * 0.52);
  grad.addColorStop(0, lightenHex(tech.primary, 40));
  grad.addColorStop(0.55, tech.primary);
  grad.addColorStop(1, tech.secondary);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, S, S);

  // --- subtle decorative ring ---
  ctx.save();
  ctx.strokeStyle = `${tech.text}22`;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(S / 2, S / 2, S * 0.36, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.needsUpdate = true;

  if (tech.imageSrc) {
    const img = new Image();
    img.src = tech.imageSrc;
    img.onload = () => {
      const imgAspect = img.width / img.height;
      let drawW, drawH;
      const maxDim = S * 0.55; 
      if (imgAspect > 1) {
        drawW = maxDim;
        drawH = maxDim / imgAspect;
      } else {
        drawH = maxDim;
        drawW = maxDim * imgAspect;
      }
      const x = (S - drawW) / 2;
      const y = (S - drawH) / 2;
      
      ctx.drawImage(img, x, y, drawW, drawH);
      tex.needsUpdate = true;
    };
  } else {
    // text label fallback
    const lines = tech.label.split("\n");
    const maxChars = Math.max(...lines.map((l) => l.length));
    let fontSize = Math.min(S / (maxChars * 0.55), S / (lines.length * 2.2));
    fontSize = Math.min(fontSize, 120);
    fontSize = Math.max(fontSize, 36);

    ctx.font = `700 ${fontSize}px "Geist","Inter","Segoe UI",system-ui,sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = tech.text;

    const lineHeight = fontSize * 1.15;
    const startY = S / 2 - ((lines.length - 1) * lineHeight) / 2;
    lines.forEach((line, i) => ctx.fillText(line, S / 2, startY + i * lineHeight));
    tex.needsUpdate = true;
  }

  return tex;
}

// ---------------------------------------------------------------------------
// Pre-computed geometry & sphere configs
// ---------------------------------------------------------------------------
const sphereGeometry = new THREE.SphereGeometry(1, 28, 28);

// One sphere per technology, with slight scale variation for visual interest
const spheres = technologies.map((_, i) => ({
  scale: [0.75, 0.85, 0.95, 1, 0.8][i % 5],
}));

// ---------------------------------------------------------------------------
// SphereGeo – a single physics-driven sphere
// ---------------------------------------------------------------------------
type SphereProps = {
  vec?: THREE.Vector3;
  scale: number;
  r?: typeof THREE.MathUtils.randFloatSpread;
  material: THREE.MeshPhysicalMaterial;
  isActive: boolean;
};

function SphereGeo({
  vec = new THREE.Vector3(),
  scale,
  r = THREE.MathUtils.randFloatSpread,
  material,
  isActive,
}: SphereProps) {
  const api = useRef<RapierRigidBody | null>(null);

  useFrame((_state, delta) => {
    if (!isActive) return;
    delta = Math.min(0.1, delta);
    const impulse = vec
      .copy(api.current!.translation())
      .normalize()
      .multiply(
        new THREE.Vector3(
          -50 * delta * scale,
          -150 * delta * scale,
          -50 * delta * scale
        )
      );

    api.current?.applyImpulse(impulse, true);
  });

  return (
    <RigidBody
      linearDamping={0.75}
      angularDamping={0.15}
      friction={0.2}
      position={[r(20), r(20) - 25, r(20) - 10]}
      ref={api}
      colliders={false}
    >
      <BallCollider args={[scale]} />
      <CylinderCollider
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, 0, 1.2 * scale]}
        args={[0.15 * scale, 0.275 * scale]}
      />
      <mesh
        castShadow
        receiveShadow
        scale={scale}
        geometry={sphereGeometry}
        material={material}
        rotation={[0.3, 1, 1]}
      />
    </RigidBody>
  );
}

// ---------------------------------------------------------------------------
// Pointer – invisible kinematic body that follows the mouse
// ---------------------------------------------------------------------------
type PointerProps = {
  vec?: THREE.Vector3;
  isActive: boolean;
};

function Pointer({ vec = new THREE.Vector3(), isActive }: PointerProps) {
  const ref = useRef<RapierRigidBody>(null);

  useFrame(({ pointer, viewport }) => {
    if (!isActive) return;
    const targetVec = vec.lerp(
      new THREE.Vector3(
        (pointer.x * viewport.width) / 2,
        (pointer.y * viewport.height) / 2,
        0
      ),
      0.2
    );
    ref.current?.setNextKinematicTranslation(targetVec);
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

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const threshold = document
        .getElementById("work")!
        .getBoundingClientRect().top;
      setIsActive(scrollY > threshold);
    };
    document.querySelectorAll(".header a").forEach((elem) => {
      const element = elem as HTMLAnchorElement;
      element.addEventListener("click", () => {
        const interval = setInterval(() => {
          handleScroll();
        }, 10);
        setTimeout(() => {
          clearInterval(interval);
        }, 1000);
      });
    });
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Build one material per technology.
  // For techs with a local imageSrc we try to load it; we always have a
  // canvas-generated fallback ready so the sphere never shows blank.
  const materials = useMemo(() => {
    return technologies.map((tech) => {
      const canvasTex = createCanvasTexture(tech);
      return new THREE.MeshPhysicalMaterial({
        map: canvasTex,
        emissive: "#ffffff",
        emissiveMap: canvasTex,
        emissiveIntensity: 0.35,
        metalness: 0.5,
        roughness: 0.9,
        clearcoat: 0.15,
      });
    });
  }, []);

  return (
    <div className="techstack">
      <h2> My Techstack</h2>

      <Canvas
        shadows
        gl={{ alpha: true, stencil: false, depth: false, antialias: false }}
        camera={{ position: [0, 0, 20], fov: 32.5, near: 1, far: 100 }}
        onCreated={(state) => (state.gl.toneMappingExposure = 1.5)}
        className="tech-canvas"
      >
        <ambientLight intensity={1} />
        <spotLight
          position={[20, 20, 25]}
          penumbra={1}
          angle={0.2}
          color="white"
          castShadow
          shadow-mapSize={[512, 512]}
        />
        <directionalLight position={[0, 5, -4]} intensity={2} />
        <Physics gravity={[0, 0, 0]}>
          <Pointer isActive={isActive} />
          {spheres.map((props, i) => (
            <SphereGeo
              key={i}
              {...props}
              material={materials[i]}
              isActive={isActive}
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
      </Canvas>
    </div>
  );
};

export default TechStack;
