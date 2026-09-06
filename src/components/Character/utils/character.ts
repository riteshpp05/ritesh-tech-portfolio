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
        "/perfect_model.glb",
        async (gltf) => {
          const character = gltf.scene;
          await renderer.compileAsync(character, camera, scene);

          // Full-body Avaturn models use scale 7 to fit the camera
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
