import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    target: "esnext",
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules/three/") || id.includes("node_modules/three-stdlib/")) {
            return "three-vendor";
          }
          if (id.includes("node_modules/@react-three/rapier") || id.includes("@dimforge/rapier3d")) {
            return "rapier";
          }
          if (id.includes("node_modules/@react-three/")) {
            return "react-three";
          }
          if (id.includes("node_modules/gsap/")) {
            return "gsap-vendor";
          }
          if (
            id.includes("node_modules/react/") ||
            id.includes("node_modules/react-dom/") ||
            id.includes("node_modules/react-router-dom/")
          ) {
            return "react-vendor";
          }
        },
      },
    },
    chunkSizeWarningLimit: 1200,
  },
});
