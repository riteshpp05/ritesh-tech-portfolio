import * as THREE from "three";
import { DRACOLoader, GLTF, GLTFLoader } from "three-stdlib";
import { setCharTimeline, setAllTimeline } from "../../utils/GsapScroll";

const setCharacter = (
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera
) => {
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/draco/");
  loader.setDRACOLoader(dracoLoader);

  const loadCharacter = () => {
    return new Promise<GLTF | null>((resolve, reject) => {
      loader.load(
        "/models/model.glb",
        async (gltf) => {
          const character = gltf.scene;
          await renderer.compileAsync(character, camera, scene);

          // The Avaturn model is human-scale (~1.7 units tall).
          // Camera is at y:13.1, z:24.7 with FOV 14.5 — we need the character
          // to be roughly centered in frame with head visible.
          character.scale.set(7, 7, 7);
          character.position.set(0, 1, 0);

          character.traverse((child: any) => {
            if (child.isMesh) {
              const mesh = child as THREE.Mesh;
              child.castShadow = true;
              child.receiveShadow = true;
              mesh.frustumCulled = true;
            }
          });

          resolve(gltf);
          setCharTimeline(character, camera);
          setAllTimeline();

          dracoLoader.dispose();
        },
        undefined,
        (error) => {
          reject(error);
        }
      );
    });
  };

  return { loadCharacter };
};

export default setCharacter;
