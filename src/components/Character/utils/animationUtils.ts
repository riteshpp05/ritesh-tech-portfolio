import * as THREE from "three";
import { GLTF } from "three-stdlib";

const setAnimations = (gltf: GLTF) => {
  const character = gltf.scene;
  const mixer = new THREE.AnimationMixer(character);

  const spine = character.getObjectByName("Spine");
  const spine1 = character.getObjectByName("Spine1");
  const neck = character.getObjectByName("Neck");
  const head = character.getObjectByName("Head");

  const leftShoulder = character.getObjectByName("LeftShoulder");
  const leftArm = character.getObjectByName("LeftArm");
  const leftForeArm = character.getObjectByName("LeftForeArm");
  const leftHand = character.getObjectByName("LeftHand");

  const rightShoulder = character.getObjectByName("RightShoulder");
  const rightArm = character.getObjectByName("RightArm");
  const rightForeArm = character.getObjectByName("RightForeArm");
  const rightHand = character.getObjectByName("RightHand");

  const leftUpLeg = character.getObjectByName("LeftUpLeg");
  const rightUpLeg = character.getObjectByName("RightUpLeg");

  // Shoulders - drop them down a bit more
  if (leftShoulder) {
    leftShoulder.quaternion.multiply(
      new THREE.Quaternion().setFromEuler(new THREE.Euler(0, 0, 0.15))
    );
  }
  if (rightShoulder) {
    rightShoulder.quaternion.multiply(
      new THREE.Quaternion().setFromEuler(new THREE.Euler(0, 0, -0.15))
    );
  }

  // Upper Arms - Rotate down (X) and tight against the body (Z)
  if (leftArm) {
    leftArm.quaternion.multiply(
      new THREE.Quaternion().setFromEuler(new THREE.Euler(1.4, 0, 0.25))
    );
  }
  if (rightArm) {
    rightArm.quaternion.multiply(
      new THREE.Quaternion().setFromEuler(new THREE.Euler(1.4, 0, -0.25))
    );
  }

  // Forearms - keep them straight and tightly inward
  if (leftForeArm) {
    leftForeArm.quaternion.multiply(
      new THREE.Quaternion().setFromEuler(new THREE.Euler(0, 0.2, 0.1))
    );
  }
  if (rightForeArm) {
    rightForeArm.quaternion.multiply(
      new THREE.Quaternion().setFromEuler(new THREE.Euler(0, -0.2, -0.1))
    );
  }

  // Hands
  if (leftHand) {
    leftHand.quaternion.multiply(
      new THREE.Quaternion().setFromEuler(new THREE.Euler(0.1, 0, 0))
    );
  }
  if (rightHand) {
    rightHand.quaternion.multiply(
      new THREE.Quaternion().setFromEuler(new THREE.Euler(0.1, 0, 0))
    );
  }

  // Legs
  if (leftUpLeg) {
    leftUpLeg.quaternion.multiply(
      new THREE.Quaternion().setFromEuler(new THREE.Euler(0, 0, 0.03))
    );
  }
  if (rightUpLeg) {
    rightUpLeg.quaternion.multiply(
      new THREE.Quaternion().setFromEuler(new THREE.Euler(0, 0, -0.03))
    );
  }

  // Head
  if (neck) {
    neck.quaternion.multiply(
      new THREE.Quaternion().setFromEuler(new THREE.Euler(-0.05, 0, 0))
    );
  }

  // --- Subtle breathing animation ---
  if (spine1) {
    const q0 = new THREE.Quaternion().setFromEuler(new THREE.Euler(0, 0, 0));
    const q1 = new THREE.Quaternion().setFromEuler(new THREE.Euler(0.012, 0, 0));
    const breathTrack = new THREE.QuaternionKeyframeTrack(
      `${spine1.name}.quaternion`,
      [0, 1.5, 3],
      [q0.x, q0.y, q0.z, q0.w, q1.x, q1.y, q1.z, q1.w, q0.x, q0.y, q0.z, q0.w]
    );
    const breathClip = new THREE.AnimationClip("breathing", 3, [breathTrack]);
    const breathAction = mixer.clipAction(breathClip);
    breathAction.setLoop(THREE.LoopRepeat, Infinity);
    breathAction.play();
  }

  // --- Subtle idle sway ---
  if (spine) {
    const q0 = new THREE.Quaternion().setFromEuler(new THREE.Euler(0, 0, 0));
    const q1 = new THREE.Quaternion().setFromEuler(new THREE.Euler(0, 0.008, 0.005));
    const swayTrack = new THREE.QuaternionKeyframeTrack(
      `${spine.name}.quaternion`,
      [0, 2.5, 5],
      [q0.x, q0.y, q0.z, q0.w, q1.x, q1.y, q1.z, q1.w, q0.x, q0.y, q0.z, q0.w]
    );
    const swayClip = new THREE.AnimationClip("idle_sway", 5, [swayTrack]);
    const swayAction = mixer.clipAction(swayClip);
    swayAction.setLoop(THREE.LoopRepeat, Infinity);
    swayAction.play();
  }

  function startIntro() {}

  function hover(_gltf: GLTF, hoverDiv: HTMLDivElement) {
    let isHovering = false;
    const onHoverFace = () => {
      if (!isHovering && head) isHovering = true;
    };
    const onLeaveFace = () => {
      if (isHovering) isHovering = false;
    };
    if (!hoverDiv) return;
    hoverDiv.addEventListener("mouseenter", onHoverFace);
    hoverDiv.addEventListener("mouseleave", onLeaveFace);
    return () => {
      hoverDiv.removeEventListener("mouseenter", onHoverFace);
      hoverDiv.removeEventListener("mouseleave", onLeaveFace);
    };
  }

  return { mixer, startIntro, hover };
};

export default setAnimations;
